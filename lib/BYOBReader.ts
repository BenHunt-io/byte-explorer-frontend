
/**
 * Response given after reading bytes into a buffer.
 */
type ReadResponse = {
    numBytesWritten : number
    buffer: Buffer // Buffer that bytes were written
}

// Reads bytes from string input. Can select what encoding the string is in that is supported
// by the Buffer API.
export default class BYOBReader {

    buffer : Buffer;


    constructor(data : string, encoding : BufferEncoding){
        this.buffer = Buffer.from(data, encoding);
    }

  
    /**
     * @param buffer the buffer to write bytes into
     */
    read(buffer : Buffer) : ReadResponse {

        let numBytesWritten = this.buffer.copy(buffer, 0, 0, buffer.length);
        this.buffer = this.buffer.subarray(buffer.length, this.buffer.length);

        return {
            numBytesWritten,
            buffer
        };
        
    }

    bytesRemaining(){
        return this.buffer.length;
    }
}