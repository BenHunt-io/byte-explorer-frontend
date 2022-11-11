import BYOBReader from "../BYOBReader";
import { Buffer } from 'buffer';
import reverse from 'buffer-reverse';
import MerkleTree from "../MerkleTree";

type TransactionBuffer = {
    version : Buffer
    inputCount: Buffer
    outputCount: Buffer
    inputs: TransactionInputBuffer[]
    outputs: TransactionOutputBuffer[]
    lockTime: Buffer
}

type TransactionInputBuffer = {
    transactionId : Buffer
    vOut : Buffer
    scriptSize: Buffer
    script: Buffer
    sequence: Buffer
}

type TransactionOutputBuffer = {
    value : Buffer
    scriptPubKeySize : Buffer
    scriptPubKey : Buffer
}

export class Transaction {


    private txBuffer : TransactionBuffer;
    private rawTx?: string;
    private txId: string = "";

    constructor(txBuffer : TransactionBuffer){
        this.txBuffer = txBuffer;
        this.initializeRawTx();
    }

    public getVersion(){
        return this.txBuffer.version.readUintLE(0, 1);
    }
 
    public getInputCount(){
        return this.txBuffer.inputCount.readUintLE(0, 1);
    }

    public getOutputCount(){
        return this.txBuffer.outputCount.readUintLE(0, 1);
    }

    public getInputs(){
        return this.txBuffer.inputs.map(input => new TransactionInput(input));
    }

    public getOutputs(){
        return this.txBuffer.outputs.map(output => new TransactionOutput(output));
    }

    public getLockTime(){
        return this.txBuffer.lockTime.readUIntLE(0, 1);
    }

    initializeRawTx(){
        let txBuffer = Buffer.concat([this.txBuffer.version, this.txBuffer.inputCount]);

        this.txBuffer.inputs.forEach(input => {
            txBuffer = Buffer.concat([txBuffer, input.transactionId, input.vOut, input.scriptSize, input.script, input.sequence]);
        })

        txBuffer = Buffer.concat([txBuffer, this.txBuffer.outputCount]);

        this.txBuffer.outputs.forEach(output => {
            txBuffer = Buffer.concat([txBuffer, output.value, output.scriptPubKeySize, output.scriptPubKey]);
        })

        txBuffer = Buffer.concat([txBuffer, this.txBuffer.lockTime]);

        this.rawTx = txBuffer.toString('hex');
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

export class TransactionInput {

    private txInputBuffer : TransactionInputBuffer;

    constructor(txInputBuffer : TransactionInputBuffer){
        this.txInputBuffer = txInputBuffer;
    }

    public getTransactionId(){
        return this.txInputBuffer.transactionId.toString('hex');
    }

    public getVOut(){
        return this.txInputBuffer.vOut.readUInt32LE();
    }

    public getScriptSize(){
        return this.txInputBuffer.scriptSize.readUintLE(0, 1);

    }

    public getScript(){
        return this.txInputBuffer.script.toString('hex');
    }

    public getSequence(){
        return this.txInputBuffer.sequence.toString('hex');
    }
}

export class TransactionOutput {

    private txOutputBuffer : TransactionOutputBuffer;

    constructor(txOutputBuffer : TransactionOutputBuffer){
        this.txOutputBuffer = txOutputBuffer;
    }

    public getValue(){
        return this.txOutputBuffer.value.readBigInt64LE();
    }

    public getScriptPubKeySize(){
        return this.txOutputBuffer.scriptPubKeySize.readUintLE(0, 1);
    }

    public getScriptPubKey(){
        return this.txOutputBuffer.scriptPubKey.toString('hex');
    }

}


export class TransactionReaderV1 {


    static parse(reader: BYOBReader){

        // let fields = new Map<TransactionField, Buffer>();
        
        let versionBuffer = Buffer.alloc(4);
        versionBuffer.writeUIntLE(1, 0, 4);
        
        // TODO: variable length
        let inputCountBuffer =reverse(reader.read(Buffer.alloc(1)).buffer);
        let inputCount = inputCountBuffer.readUintLE(0, 1)

        let inputs = [];
        for(let i = 0; i<inputCount; i++){
            let transactionId = reader.read(Buffer.alloc(32)).buffer;
            let vOut = reader.read(Buffer.alloc(4)).buffer;
            let scriptSizeBuffer = reader.read(Buffer.alloc(1)).buffer;
            let scriptSize = scriptSizeBuffer.readUintLE(0,1);
            let script = reader.read(Buffer.alloc(scriptSize)).buffer;
            let sequence = reader.read(Buffer.alloc(4)).buffer;
            
            inputs.push({
                transactionId,
                vOut,
                scriptSize : scriptSizeBuffer,
                script,
                sequence
            });
        }

        // TODO: variable length
        let outputCountBuffer = reverse(reader.read(Buffer.alloc(1)).buffer);
        let outputCount = inputCountBuffer.readUintLE(0, 1)

        let outputs = [];
        for(let i = 0; i<outputCount; i++){
            let value = reader.read(Buffer.alloc(8)).buffer;
            let scriptPubKeySizeBuffer = reverse(reader.read(Buffer.alloc(1)).buffer);
            let scriptPubKeySize = scriptPubKeySizeBuffer.readUintLE(0, 1);
            let scriptPubKey = reader.read(Buffer.alloc(scriptPubKeySize)).buffer;

            outputs.push({
                value,
                scriptPubKeySize: scriptPubKeySizeBuffer,
                scriptPubKey
            });
        }

        let lockTime = reader.read(Buffer.alloc(4)).buffer;

        return new Transaction
        (
                {
                    version: versionBuffer,
                    inputCount: inputCountBuffer,
                    inputs,
                    outputs,
                    outputCount: outputCountBuffer,
                    lockTime
                }
            
         );
    }
}