import BYOBReader from "../BYOBReader";
import reverse from 'buffer-reverse';
import { Buffer } from 'buffer';
import { Transaction, TransactionReaderV1 } from "./Transaction";


enum BlockHeaderField {
    Version,
    PreviousBlockHeaderHash,
    MerkleRootHash,
    Time,
    Bits,
    Nonce
}

export class BlockHeader {

    private fields;

    constructor(fields : Map<BlockHeaderField, Buffer>){
        this.fields = fields;
    }

    getVersion() {
        let versionBuffer = this.fields.get(BlockHeaderField.Version);
        if(!versionBuffer){
            throw new Error("Version should be defined");
        }
        return versionBuffer.readUInt32LE();
    }

    getPreviousBlockHash(){
        let previousBlockHeaderHash = this.fields.get(BlockHeaderField.PreviousBlockHeaderHash);
        if(!previousBlockHeaderHash){
            throw new Error("PreviousBlockHeaderHash should be defined");
        }
        return previousBlockHeaderHash.toString('hex');
    }

    getMerkleRootHash(){
        let merkleRootHash = this.fields.get(BlockHeaderField.MerkleRootHash);
        if(!merkleRootHash){
            throw new Error("MerkleRootHash should be defined");
        }
        return merkleRootHash.toString('hex');
    }

    getTime(){
        let time = this.fields.get(BlockHeaderField.Time);
        if(!time){
            throw new Error("Time should be defined");
        }
        return time.readUInt32LE();
    }

    getBits(){
        let bits = this.fields.get(BlockHeaderField.Bits);
        if(!bits){
            throw new Error("Bits should be defined");
        }
        return bits.toString('hex');
    }

    getNonce(){
        let nonce = this.fields.get(BlockHeaderField.Nonce);
        if(!nonce){
            throw new Error("Nonce should be defined");
        }
        return nonce.readUInt32LE();
    }
}

// Convert all data to little endian (normal byte ordering)
export class BlockHeaderReaderV1 {

    static parse(reader: BYOBReader){
        let fields = new Map<BlockHeaderField, Buffer>();

        let versionBuffer = Buffer.alloc(4);
        versionBuffer.writeInt32LE(1);        
        fields.set(BlockHeaderField.Version, versionBuffer);
        
        this.decodePreviousBlockHashToBinary(reader, fields);
        this.decodeMerkleRootToBinary(reader, fields);
        this.decodeTimeToBinary(reader, fields);
        this.decodeBitsToBinary(reader, fields);
        this.decodeNonceToBinary(reader, fields);

        return new BlockHeader(fields);
    }

    private static decodeVersionToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: version} = reader.read(Buffer.alloc(4));
        fields.set(BlockHeaderField.Version, reverse(version));
    }

    private static decodePreviousBlockHashToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: previousBlockHash} = reader.read(Buffer.alloc(32));
        fields.set(BlockHeaderField.PreviousBlockHeaderHash, reverse(previousBlockHash));
    }

    private static decodeMerkleRootToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: merkleRoot} = reader.read(Buffer.alloc(32));
        fields.set(BlockHeaderField.MerkleRootHash, reverse(merkleRoot));
    }

    private static decodeTimeToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: time} = reader.read(Buffer.alloc(4));
        fields.set(BlockHeaderField.Time, time);
    }

    private static decodeNonceToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: nonce} = reader.read(Buffer.alloc(4));
        fields.set(BlockHeaderField.Nonce, nonce);
    }

    private static decodeBitsToBinary(reader: BYOBReader, fields : Map<BlockHeaderField, Buffer>){
        let {buffer: bits} = reader.read(Buffer.alloc(4));
        fields.set(BlockHeaderField.Bits, reverse(bits));
    }

}

export class BlockHeaderReaderV2 {

    static parse(reader: BYOBReader){

        return null;
    }
}

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