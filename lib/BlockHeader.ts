import { Buffer } from 'buffer';

export default class BlockHeader {

    private rawHexData : string;

    constructor(rawHexData : string){
        this.rawHexData = rawHexData;

        // @ts-ignore
        let reader = new BYOBReader(rawHexData, 'hex');

        let result = reader.read(Buffer.alloc(1));

        console.log(result);
    }

}



class BYOBReader {

    buffer : Buffer;

    constructor(data : string, encoding : BufferEncoding){
        this.buffer = Buffer.from(data, encoding);
    }

    read(buffer : Buffer) : Buffer {

        this.buffer.copy(buffer, 0, 0, 2);

        return buffer;
        
    }
}