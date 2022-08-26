import { Buffer } from 'buffer';
import reverse from 'buffer-reverse';


type ByteOrder = 'BigEndian' | 'LittleEndian';

export default class BlockHeader {

    private rawHexData : string;

    // Header Fields
    private version : Buffer;
    private previousBlockHash : Buffer;
    private merkleRoot : Buffer;
    private time : Buffer;
    private bits : Buffer;
    private nonce : Buffer;


    /**
     * Hex encoded blocks returned from 'getblocks' is mostly given to us in BigEndian except
     * for the fields: {time, nonce} which are in LittleEndian format
     */
    constructor(rawHexData : string, byteOrder : ByteOrder){
        this.rawHexData = rawHexData;

        // @ts-ignore
        let reader = new BYOBReader(rawHexData, 'hex');

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
            this.version = reverse(reader.read(Buffer.alloc(4)));
            this.previousBlockHash = reverse(reader.read(Buffer.alloc(32)));
            this.merkleRoot = reverse(reader.read(Buffer.alloc(32)));
            this.time = reader.read(Buffer.alloc(4));
            this.bits = reverse(reader.read(Buffer.alloc(4)));
            this.nonce = reader.read(Buffer.alloc(4));
        }
    }

    public getBlockHeader(){
        return {
            version : this.version.readUint32LE(),
            previousBlockHash : reverse(this.previousBlockHash).toString('hex'),
            merkleRoot : reverse(this.merkleRoot).toString('hex'),
            time : this.time.readUInt32LE(),
            bits : this.bits.toString('hex'),
            nonce : this.nonce.readUInt32LE(),
        }
    }

}



// Reads bytes from string input. Can select what encoding the string is in that is supported
// by the Buffer API.
class BYOBReader {

    buffer : Buffer;


    constructor(data : string, encoding : BufferEncoding){
        this.buffer = Buffer.from(data, encoding);
    }

    read(buffer : Buffer) : Buffer {

        this.buffer.copy(buffer, 0, 0, buffer.length);
        this.buffer = this.buffer.subarray(buffer.length, this.buffer.length);

        return buffer;
        
    }
}