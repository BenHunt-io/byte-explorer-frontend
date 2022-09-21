import { Encoding, subtle } from "node:crypto";
import { Buffer } from 'buffer';
import reverse from 'buffer-reverse';
import BYOBReader from '../BYOBReader'
import MerkleTree from "../MerkleTree";



type TxInBuffer = {
    txId : Buffer,
    vOut : Buffer,
    scriptSigSize : Buffer;
    scriptSig : Buffer,
    sequence : Buffer
}

type TxIn = {
    txId : string,
    vOut : number,
    scriptSigSize : number;
    scriptSig : string,
    sequence : string
}

type TxOutBuffer = {
    value : Buffer,
    scriptPubKeySize : Buffer;
    scriptPubKey : Buffer,
}

type TxOut = {
    value : bigint,
    scriptPubKeySize : number;
    scriptPubKey : string,
}


/**
 * Constructs a transaction from raw hex encoded transaction data. Continually parses
 * a stream of bytes from start to end with different parsing functions implementing the decoding
 * of each part of the transaction.
 * 
 *  
 */
export default class Transaction {

    private rawTx?;

    // Parsed fields as bytes
    private version : Buffer = Buffer.alloc(0);
    private flag : Buffer = Buffer.alloc(0);
    private inputCount : Buffer = Buffer.alloc(0);
    private inputs : TxInBuffer[] = [];
    private outputCount : Buffer = Buffer.alloc(0);
    private outputs : TxOutBuffer[] = [];
    private lockTime : Buffer = Buffer.alloc(0);

    // SegWit fields
    private witnessOneSizeBuffer : Buffer = Buffer.alloc(0);
    private witnessOne : Buffer = Buffer.alloc(0);
    private witnessTwoSizeBuffer : Buffer = Buffer.alloc(0); 
    private witnessTwo : Buffer = Buffer.alloc(0);

    // calculated fields
    private txId = ""; 

    // Store transactions in the byte order that is used in the blockchain.
    constructor({rawTxData, reader, coinbaseTx=false} : {rawTxData? : string, reader? : BYOBReader, coinbaseTx? : boolean}){

        if(rawTxData){
            this.rawTx = rawTxData;
            let reader = new BYOBReader(rawTxData, 'hex');
            this.parseTransactionBytes(reader, coinbaseTx);
        }else if(reader){
            this.parseTransactionBytes(reader, coinbaseTx);
            // creates the raw tx string from all the byte data (buffers)
            this.initializeRawTx();
        }
    }

    static createFromReader(reader : BYOBReader, coinbaseTx : boolean){
        return new Transaction({reader, coinbaseTx});
    }

    static create(rawTxData : string, coinbaseTx: boolean){
        return new Transaction({rawTxData, coinbaseTx});
    }

    initializeRawTx(){
        let txBuffer = Buffer.concat([this.version, this.flag, this.inputCount]);

        this.inputs.forEach(input => {
            txBuffer = Buffer.concat([txBuffer, input.txId, input.vOut, input.scriptSigSize, input.scriptSig, input.sequence]);
        })

        txBuffer = Buffer.concat([txBuffer, this.outputCount]);

        this.outputs.forEach(output => {
            txBuffer = Buffer.concat([txBuffer, output.value, output.scriptPubKeySize, output.scriptPubKey]);
        })

        txBuffer = Buffer.concat([txBuffer, this.lockTime]);

        this.rawTx = txBuffer.toString('hex');
    }

    parseTransactionBytes(reader : BYOBReader, coinbaseTx: boolean){

        this.version = reader.read(Buffer.alloc(4));
        // Don't know how to make my regtest node not use segwit for coinbase txs
        if(coinbaseTx){
            this.flag = reader.read(Buffer.alloc(2));
        }
        this.parseInputs(reader);
        this.parseOutputs(reader);
        // Don't know how to make my regtest node not use segwit for coinbase txs
        if(coinbaseTx){
            this.parseWitnesses(reader);
        }
        this.parseLockTime(reader);
    }



    parseInputs(reader : BYOBReader){
        // Number of inputs
        this.inputCount = reader.read(Buffer.alloc(1));
        let numInputs = this.inputCount.readUintBE(0, 1);

        for(let i = 0; i<numInputs; i++){
            this.parseInput(reader);
        }

    }

    parseInput(reader : BYOBReader){
        let txIdBuffer = reader.read(Buffer.alloc(32));
        let vOutBuffer = reader.read(Buffer.alloc(4));
        let scriptSigSizeBuffer = reader.read(Buffer.alloc(1));
        let scriptSigSize = scriptSigSizeBuffer.readUintBE(0, 1);
        let scriptSigBuffer = reader.read(Buffer.alloc(scriptSigSize));
        let sequenceBuffer = reader.read(Buffer.alloc(4));

        this.inputs.push({
            txId : txIdBuffer,
            vOut : vOutBuffer,
            scriptSigSize : scriptSigSizeBuffer,
            scriptSig : scriptSigBuffer,
            sequence : sequenceBuffer
        })
    }

    parseOutputs(reader : BYOBReader) {
        // Number of outputs
        this.outputCount = reader.read(Buffer.alloc(1));
        let numOutputs = this.outputCount.readUintBE(0, 1);

        for(let i = 0; i<numOutputs; i++){
             this.parseOutput(reader);
        }
    }

    parseOutput(reader : BYOBReader) {
        
        // in sats
        let value = reader.read(Buffer.alloc(8));
        let scriptPubKeySizeBuffer = reader.read(Buffer.alloc(1));
        let scriptPubKeySize = scriptPubKeySizeBuffer.readUintBE(0, 1);

        let scriptPubKey = reader.read(Buffer.alloc(scriptPubKeySize));

        this.outputs.push({
            value : value,
            scriptPubKeySize : scriptPubKeySizeBuffer,
            scriptPubKey : scriptPubKey
       });

    }

    parseWitnesses(reader : BYOBReader) {

        let numWitnessesBuffer = reader.read(Buffer.alloc(1));
        let numWitnesses = numWitnessesBuffer.readUintBE(0, 1);

        // SegWit 1
        this.witnessOneSizeBuffer = reader.read(Buffer.alloc(1));
        let witnessSize = this.witnessOneSizeBuffer.readUintBE(0, 1);

        this.witnessOne = reader.read(Buffer.alloc(witnessSize));
    }

    parseLockTime(reader : BYOBReader){
        this.lockTime = reader.read(Buffer.alloc(4));
    }

    getVersion(){
        return this.version?.readUint32LE();
    }

    getInputCount(){
        return this.inputCount?.readUint8();
    }

    // 0x0001 signals presence of witness data, otherwise omitted
    // Technically split into two sections [marker][flag] both 1 byte each.
    isWitnessFlagPresent(){
        return this.flag?.readUInt16BE() == 1
    }



    getTransactionInputs()  : TxIn[] {
        return this.inputs.map((txInBuffer) => ({
                txId : reverse(txInBuffer.txId).toString('hex'),
                vOut : txInBuffer.vOut.readUInt32LE(),
                scriptSigSize : txInBuffer.scriptSigSize.readUInt8(),
                scriptSig : txInBuffer.scriptSig.toString('hex'),
                sequence : txInBuffer.sequence.toString('hex')
        }));
    }

    getOutputCount(){
        return this.outputCount?.readUint8();
    }

    getTransactionOutputs() : TxOut[] {
        return this.outputs.map((txOutBuffer) => ({
            value : txOutBuffer.value.readBigInt64LE(),
            scriptPubKeySize : txOutBuffer.scriptPubKeySize.readUintBE(0, 1),
            scriptPubKey : txOutBuffer.scriptPubKey.toString('hex')
        }));
    }

    getLockTime(){
        return this.lockTime?.readUint32LE();
    }


    getWitnesses(){
        return [
            {
                size : this.witnessOneSizeBuffer?.readUIntBE(0, 1),
                witness : this.witnessOne?.toString('hex')
            },
            {
                size : this.witnessTwoSizeBuffer?.readUintBE(0, 1),
                witness : this.witnessTwo?.toString('hex')
            }
        ]
    }

    /**
     * @returns The id for this transaction. It is only initialized outside of this class.
     */
    getTxId(){
        return this.txId;
    }

    async initializeTxId(){
        this.txId = await this.calculateTxId();
    }
    
    async calculateTxId(){
        if(this.rawTx){
            return MerkleTree.hashTwice(this.rawTx)
                .then(txId => reverse(Buffer.from(txId, 'hex')).toString('hex'))
        }
        return "";
    }
} 