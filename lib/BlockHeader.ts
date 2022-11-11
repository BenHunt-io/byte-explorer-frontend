import { Buffer } from 'buffer';
import reverse from 'buffer-reverse';
import Block, { DecodingError } from './Block';
import BYOBReader from './BYOBReader';

export default class BlockHeader {

    private rawHexData? : string;

    // Header Fields
    private version : Buffer = Buffer.alloc(0);
    private previousBlockHash : Buffer = Buffer.alloc(0);
    private merkleRoot : Buffer = Buffer.alloc(0);
    private time : Buffer = Buffer.alloc(0);
    private bits : Buffer  = Buffer.alloc(0);
    private nonce : Buffer  = Buffer.alloc(0);

    private errors : DecodingError = new Map();


    /**
     * Hex encoded blocks returned from 'getblocks' is mostly given to us in BigEndian except
     * for the fields: {time, nonce} which are in LittleEndian format
     */
    constructor({rawHexData, reader} : {rawHexData? : string, reader? : BYOBReader}){

        if(rawHexData){
            this.rawHexData = rawHexData;
            // @ts-ignore
            reader = new BYOBReader(rawHexData, 'hex');
            this.parseHeaderBytes(reader);
        }else if(reader){
            this.parseHeaderBytes(reader);
        }
    }

    // Store the bytes in the same order as the blockchain expects to receive them in.
    parseHeaderBytes(reader : BYOBReader){
        // Block hex data returned from Bitcoin's RPC has time and nonce not stored in BE like the other values.
        // raw block data assumed to be in the order that is returned from getblock RPC call
        this.decodeVersionToBinary(reader);
        this.decodePreviousBlockHashToBinary(reader);
        this.decodeMerkleRootToBinary(reader);
        this.decodeTimeToBinary(reader);
        this.decodeBitsToBinary(reader);
        this.decodeNonceToBinary(reader);
    }

    decodeVersionToBinary(reader: BYOBReader){
        let {buffer: version, numBytesWritten} = reader.read(Buffer.alloc(4));
        this.version = reverse(version);

        if(numBytesWritten != this.version.length){
            this.errors.set("version", Block.createDecodingErrorMsg(numBytesWritten, this.version.length));
        }else{
            this.errors.set("version", null);
        }
    }

    decodePreviousBlockHashToBinary(reader: BYOBReader){
        let {buffer: previousBlockHash, numBytesWritten} = reader.read(Buffer.alloc(32));
        this.previousBlockHash = previousBlockHash;

        if(numBytesWritten != this.previousBlockHash.length){
            this.errors.set("previousBlockHash", Block.createDecodingErrorMsg(numBytesWritten, this.previousBlockHash.length));
        }else{
            this.errors.set("previousBlockHash", null);
        }
    }

    decodeMerkleRootToBinary(reader: BYOBReader){
        let {buffer: merkleRoot, numBytesWritten} = reader.read(Buffer.alloc(32));
        this.merkleRoot = merkleRoot;
        

        if(numBytesWritten != this.merkleRoot.length){
            this.errors.set("merkleRoot", Block.createDecodingErrorMsg(numBytesWritten, this.merkleRoot.length));
        }else{
            this.errors.set("merkleRoot", null);
        }
    }


    decodeTimeToBinary(reader: BYOBReader){
        let {buffer: time, numBytesWritten} = reader.read(Buffer.alloc(4));
        this.time = time;

        if(numBytesWritten != this.time.length){
            this.errors.set("bits", Block.createDecodingErrorMsg(numBytesWritten, this.time.length));
        }else{
            this.errors.set("bits", null);
        }
    }

    decodeNonceToBinary(reader: BYOBReader){
        let {buffer: nonce, numBytesWritten} = reader.read(Buffer.alloc(4));
        this.nonce = nonce;

        if(numBytesWritten != this.nonce.length){
            this.errors.set("nonce", Block.createDecodingErrorMsg(numBytesWritten, this.nonce.length));
        }else{
            this.errors.set("nonce", null);
        }
    }

    decodeBitsToBinary(reader: BYOBReader){
        let {buffer: bits, numBytesWritten} = reader.read(Buffer.alloc(4));
        this.bits = reverse(bits);
        
        if(numBytesWritten != this.time.length){
            this.errors.set("bits", Block.createDecodingErrorMsg(numBytesWritten, this.bits.length));
        }else{
            this.errors.set("bits", null);
        }
    }

    parseVersion(){
        return this.version.readUInt32LE()
    }

    parsePreviousBlockHash(){
        return reverse(this.previousBlockHash).toString('hex');
    }

    parseMerkleRoot(){
        return reverse(this.merkleRoot).toString('hex');
    }

    parseTime(){
        return this.time.readUInt32LE();
    }

    parseBits(){
        return this.bits.toString('hex');
    }

    parseNonce(){
        return this.nonce.readUInt32LE();
    }

    static createFromReader(reader : BYOBReader){
        return new BlockHeader({reader});
    }

    static create(rawHexData : string){
        return new BlockHeader({rawHexData});
    }

    public getFields(){
        return {
            version : this.parseVersion(),
            previousBlockHash : this.parsePreviousBlockHash(),
            merkleRoot : this.parseMerkleRoot(),
            time : this.parseTime(),
            bits : this.parseBits(),
            nonce : this.parseNonce()
        }
    }

}