export type BlockHeaderBuffer = { 
    version : Buffer
    previousBlockHeaderHash : Buffer
    merkleRootHash: Buffer
    time : Buffer;
    bits : Buffer;
    nonce : Buffer;
}

export class BlockHeader {

    private headerBuffer : BlockHeaderBuffer;

    constructor(headerBuffer : BlockHeaderBuffer){
        this.headerBuffer = headerBuffer;
    }

    getVersion() {
        return this.headerBuffer.version.readUInt32LE();
    }

    getPreviousBlockHash(){

        return this.headerBuffer.previousBlockHeaderHash.toString('hex');
    }

    getMerkleRootHash(){
        return this.headerBuffer.merkleRootHash.toString('hex');
    }

    getTime(){
        return this.headerBuffer.time.readUInt32LE();
    }

    getBits(){
       return this.headerBuffer.bits.toString('hex');
    }

    getNonce(){
        return this.headerBuffer.nonce.readUInt32LE();
    }
}