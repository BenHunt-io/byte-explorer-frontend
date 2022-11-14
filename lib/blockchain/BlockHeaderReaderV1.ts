import BYOBReader from "../BYOBReader";
import reverse from 'buffer-reverse';
import { BlockHeader } from "./BlockHeader";


// Convert all data to little endian (normal byte ordering)
export default class BlockHeaderReaderV1 {

    static parse(reader: BYOBReader){

        let version = Buffer.alloc(4);
        version.writeInt32LE(1);                

        let previousBlockHeaderHash = reverse(reader.read(Buffer.alloc(32)).buffer);
        let merkleRootHash = reverse(reader.read(Buffer.alloc(32)).buffer);
        let time = reader.read(Buffer.alloc(4)).buffer;
        let nonce = reader.read(Buffer.alloc(4)).buffer;
        let bits = reverse(reader.read(Buffer.alloc(4)).buffer);

        return new BlockHeader({
            version,
            previousBlockHeaderHash,
            merkleRootHash,
            time,
            nonce,
            bits
        })
    }
}