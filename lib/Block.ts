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
        this.header = BlockHeader.createFromReader(reader);

        let txCount = reader.read(Buffer.alloc(1)).readUintBE(0, 1);
        
        let isCoinbaseTx = true;
        this.txs.push(Transaction.createFromReader(reader, isCoinbaseTx))
        for(let i = 0; i<txCount-1; i++){
            this.txs.push(Transaction.createFromReader(reader, false));
        }
    }

    public getHeader(){
        return this.header;
    }

    public getTransactions(){
        return this.txs;
    }
}