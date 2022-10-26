


export default class ByteExplorerClient {

    private URL = process.env.NEXT_PUBLIC_BYTE_EXPLORER_BACKEND_URL;


    findBlockData({blockHeight, blockHash} : {blockHeight?: string, blockHash?: string}){

        let queryParams = "";
        if(blockHash){
            queryParams = `blockHash=${blockHash}`;
        }
        else if(blockHeight){
            queryParams = `blockHeight=${blockHeight}`;
        }

        return fetch(`${this.URL}/blockchain/block?${queryParams}`);
    }



}