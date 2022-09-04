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

    // Store the bytes in the same order as blocks are encoded and sent to the blockchain.
    parseHeaderBytes(reader : BYOBReader){
        // Block hex data returned from Bitcoin's RPC has time and nonce not stored in BE like the other values.
        // raw block data assumed to be in the order that is returned from getblock RPC call
        this.version = reverse(reader.read(Buffer.alloc(4)));
        this.previousBlockHash = reader.read(Buffer.alloc(32));
        this.merkleRoot = reader.read(Buffer.alloc(32));
        this.time = reader.read(Buffer.alloc(4));
        this.bits = reverse(reader.read(Buffer.alloc(4)));
        this.nonce = reader.read(Buffer.alloc(4));
    }



    static createFromReader(reader : BYOBReader){
        return new BlockHeader({reader});
    }

    static create(rawHexData : string){
        return new BlockHeader({rawHexData});
    }

    public getFields(){
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