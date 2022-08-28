import { Buffer } from 'buffer';
import reverse from 'buffer-reverse';
import BYOBReader from './BYOBReader'
import Transaction from './Transaction';


/**
 * These header fields are not optional, but typescript does not recoginze them being set in the constructor
 */
export default class BlockHeader {

    private rawHexData? : string;

    // Header Fields
    private version? : Buffer;
    private previousBlockHash? : Buffer;
    private merkleRoot? : Buffer;
    private time? : Buffer;
    private bits? : Buffer;
    private nonce? : Buffer;


    /**
     * Hex encoded blocks returned from 'getblocks' is mostly given to us in BigEndian except
     * for the fields: {time, nonce} which are in LittleEndian format
     */
    constructor({rawHexData, reader, byteOrder} : {rawHexData? : string, reader? : BYOBReader, byteOrder: ByteOrder}){

        if(rawHexData){
            this.rawHexData = rawHexData;
            // @ts-ignore
            reader = new BYOBReader(rawHexData, 'hex');
            this.parseHeaderBytes(reader, byteOrder);
        }else if(reader){
            this.parseHeaderBytes(reader, byteOrder);
        }
    }

    parseHeaderBytes(reader : BYOBReader, byteOrder : ByteOrder){
        // Store the bytes in the same order as blocks are encoded and sent to the blockchain.
        if(byteOrder == 'LittleEndian'){
            this.version = reader.read(Buffer.alloc(4));
            this.previousBlockHash = reader.read(Buffer.alloc(32));
            this.merkleRoot = reader.read(Buffer.alloc(32));
            this.time = reader.read(Buffer.alloc(4));
            this.bits = reader.read(Buffer.alloc(4));
            this.nonce = reader.read(Buffer.alloc(4));
        }
        else {
            // Block hex data returned from Bitcoin's RPC has time and nonce not stored in BE like the other values.
            this.version = reverse(reader.read(Buffer.alloc(4)));
            this.previousBlockHash = reverse(reader.read(Buffer.alloc(32)));
            this.merkleRoot = reverse(reader.read(Buffer.alloc(32)));
            this.time = reader.read(Buffer.alloc(4));
            this.bits = reverse(reader.read(Buffer.alloc(4)));
            this.nonce = reader.read(Buffer.alloc(4));
        }
    }



    static createFromReader(reader : BYOBReader, byteOrder : ByteOrder){
        return new BlockHeader({reader, byteOrder});
    }

    static create(rawHexData : string, byteOrder : ByteOrder){
        return new BlockHeader({rawHexData, byteOrder});
    }

    public getBlockHeader(){
        return {
            version : this.version!.readUint32LE(),
            previousBlockHash : reverse(this.previousBlockHash).toString('hex'),
            merkleRoot : reverse(this.merkleRoot).toString('hex'),
            time : this.time!.readUInt32LE(),
            bits : this.bits!.toString('hex'),
            nonce : this.nonce!.readUInt32LE(),
        }
    }

}