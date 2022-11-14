import BYOBReader from "../BYOBReader";
import { Buffer } from 'buffer';
import { Transaction, TransactionReaderV1 } from "./Transaction";
import { BlockHeader } from "./BlockHeader";
import BlockHeaderReaderV1 from "./BlockHeaderReaderV1";


export class Block {

    private header : BlockHeader;
    private transactions : Transaction[] = [];

    constructor(header: BlockHeader, transactions: Transaction[]){
        this.header = header;
        this.transactions = transactions;
    }

    static parse(rawHexData: string, regtest : boolean = false){
        let reader = new BYOBReader(rawHexData, 'hex');

        let header = Block.parseHeader(reader, regtest);
        
        let txCount = reader.read(Buffer.alloc(1)).buffer
            .readUintLE(0, 1);

    
        let txs = [];
        for(let i = 0; i < txCount; i++){
            txs.push(Block.parseTransaction(reader));
        }

        return new Block(header, txs);
    }

    private static parseTransaction(reader: BYOBReader){

        let version = reader.read(Buffer.alloc(4)).buffer.readUint32LE();

        switch(version){
            case 1: return TransactionReaderV1.parse(reader);
        }

        throw Error("Transaction version not found or recognized");

    }

    private static parseHeader(reader: BYOBReader, regtest: boolean){

        let {buffer: versionBuffer} = reader.read(Buffer.alloc(4));
        let version = !regtest ? versionBuffer.readUInt32LE() : versionBuffer.readUint32BE();

        switch(version){
            // Not sure why regtest is showing version 48 when it should be version 1.
            case 1: 
            case 48: return BlockHeaderReaderV1.parse(reader);
        }
        throw new Error("Could not parse block version");
    }

    public getHeader(){
        return this.header;
    }

    public getTransactions(){
        return this.transactions;
    }

}