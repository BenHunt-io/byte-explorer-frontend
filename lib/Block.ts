import BlockHeader from "./BlockHeader";
import BYOBReader from "./BYOBReader";
import Transaction from "./Transaction";

export default class Block {

    private rawHexData : string;
    private header : BlockHeader;
    private txs : Transaction[] = [];

    constructor(rawHexData : string){
        this.rawHexData = rawHexData;
        let reader = new BYOBReader(rawHexData, 'hex');
        this.header = BlockHeader.createFromReader(reader, 'BigEndian');

        let txCount = reader.read(Buffer.alloc(1)).readUintBE(0, 1);
        
        for(let i = 0; i<txCount; i++){
            this.txs.push(Transaction.createFromReader(reader, 'BigEndian'));
        }
    }

    public getHeader(){
        return this.header;
    }

    public getTransactions(){
        return this.txs;
    }
}