import Block from '../lib/Block';


test("Decode block with transactions", () => {

    let rawBlockData = "";
    let block = new Block(rawBlockData);

    let header = block.getHeader();
    let transactions = block.getTransactions();
})