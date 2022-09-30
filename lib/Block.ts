import BlockHeader from "./BlockHeader";
import BYOBReader from "./BYOBReader";
import Transaction from "./transaction/Transaction";


export type DecodingError = Map<string, string | null>;

/**
 * Constructs a block from a hex string or a byte reader.
 * 
 * TxIds are not initialized by default due to asyncronous crypto hash methods that are used
 * to calculate the TxIds.
 */
export default class Block {

    private rawHexData : string;
    private header : BlockHeader;
    private txs : Transaction[] = [];

    public static createDecodingErrorMsg = (bytesExpected: number,
        bytesReceived: number) => `Expected to read in ${bytesExpected} bytes, but only recieved ${bytesReceived} bytes.`

    constructor(rawHexData : string){
        this.rawHexData = rawHexData;
        let reader = new BYOBReader(rawHexData, 'hex');
        this.header = BlockHeader.createFromReader(reader);

        let txCountBuffer = Buffer.alloc(1);
        reader.read(txCountBuffer)
        let txCount = txCountBuffer.readUintBE(0, 1);
        
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

    public async findTransactionById(txIdTarget: string){

        return Promise.all(
            this.txs.map((tx) => 
                new Promise<any>((resolve) => 
                    tx.calculateTxId().then(txId => resolve({txId, tx}))
                )
            )
        ).then(txsWithId => 
            txsWithId.find((txWithid) => txWithid.txId === txIdTarget)
        )
    }    
}