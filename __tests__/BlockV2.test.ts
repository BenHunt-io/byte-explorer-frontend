import { Block } from '../lib/block/Block';
import reverse from 'buffer-reverse';
import { Buffer } from 'buffer';


// test("Decode legacy p2pkh block", () => {
    

//     // Raw Block Data: 00000030bde62aefc73fce5ce54365131d5a8a03529d51c2a4eb1730fb7d87aac918df63ea6fd6e28794dd0594b0bdb60869c11b509d0a605c1ec4509937ca45a30d555a546e1363ffff7f200500000002020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0502de000101ffffffff0200f90295000000001976a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac0000000000000000266a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f012000000000000000000000000000000000000000000000000000000000000000000000000002000000012d41f131fd5b6352d10d7c5c1536a555c8fdc6dfb8b12f80220582292332e1e4000000006a4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0fdffffff02c799f629010000001976a91492238f7f59a783a6d1794dc635149b984c4f974288ac40420f00000000001976a9140e38a704aba90db814fce3e50a69824a963f8aef88ac00000000

//     let rawBlockData = 
//         /**
//          * Header
//          */
//         "00000030" + // header version
//         "bde62aefc73fce5ce54365131d5a8a03529d51c2a4eb1730fb7d87aac918df63" + // previous block hash
//         "ea6fd6e28794dd0594b0bdb60869c11b509d0a605c1ec4509937ca45a30d555a" + // merkle root hash
//         "546e1363" + // mined datetime
//         "ffff7f20" + // difficulty bits
//         "05000000" + // nonce 
        
//         /**
//          * Transactions
//          */
//         "02" + // transaction count

//         // *** Coinbase Transaction ***
//         "02000000" + // transaction version
//         "0001" + // witness flag
//         "01" + // input count
//         "0000000000000000000000000000000000000000000000000000000000000000" + // transaction id
//         "ffffffff" + // vOut
//         "05" + // script size 
//         "02de000101" + // script sig
//         "ffffffff" + // sequence 

//         "02" + // output count
//         "00f9029500000000" + // value 
//         "19" + // locking script size (scriptPubKey)
//         "76a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac" + // locking script
//         "0000000000000000" + // value
//         "26" + // locking script size (scriptPubKey)
//         "6a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f" + // locking script
//         "01" + // witness count
//         "20" + // witness size
//         "0000000000000000000000000000000000000000000000000000000000000000" + // witness
//         "00000000" + // lock time

//         // *** Legacy Transaction P2PKH ***
//         "02000000" + // version
//         "01" + // input count 
//         "2d41f131fd5b6352d10d7c5c1536a555c8fdc6dfb8b12f80220582292332e1e4" +  // transaction id
//         "00000000" + // vout
//         "6a" + // unlocking code size (script sig size)
//         // unlock code ( unlocking script)
//         "4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0" +
//         "fdffffff" + // sequence

//         "02" + // output count
//         "c799f62901000000" + // value
//         "19" + // scriptPubKey size
//         "76a91492238f7f59a783a6d1794dc635149b984c4f974288ac" + // scriptPubKey
//         "40420f0000000000" + // value
//         "19" + // scriptPubKey size
//         "76a9140e38a704aba90db814fce3e50a69824a963f8aef88ac" +  // scriptPubKey
//         "00000000"; // locktime
    

//     let block = Block.parse(rawBlockData, true);


//     let headerFields = block.getHeader();
//     // let transactions = block.getTransactions();
//     // let coinbaseTx = transactions[0];
//     // let secondTx = transactions[1];
    

//     // Decode Header
//     expect(headerFields.getVersion()).toBe(1);
//     expect(headerFields.getPreviousBlockHash()).toBe("63df18c9aa877dfb3017eba4c2519d52038a5a1d136543e55cce3fc7ef2ae6bd");
//     expect(headerFields.getMerkleRootHash()).toBe("5a550da345ca379950c41e5c600a9d501bc16908b6bdb09405dd9487e2d66fea");
//     expect(new Date(headerFields.getTime()*1000)).toStrictEqual(new Date("2022-09-03T15:10:12.000Z"));
//     expect(headerFields.getBits()).toBe("207fffff");
//     expect(headerFields.getNonce()).toBe(5);

    // // Decode Coinbase Transaction
    // expect(coinbaseTx.getVersion()).toBe(2);
    // expect(coinbaseTx.isWitnessFlagPresent()).toBe(true);
    
    // // Parse Inputs
    // expect(coinbaseTx.getInputCount()).toBe(1);
    // let txInputs = coinbaseTx.getTransactionInputs();
    // expect(txInputs[0].txId).toBe("0000000000000000000000000000000000000000000000000000000000000000");
    // expect(txInputs[0].vOut).toBe(4_294_967_295);
    // expect(txInputs[0].scriptSigSize).toBe(5);
    // expect(txInputs[0].scriptSig).toBe("02de000101");
    // expect(txInputs[0].sequence).toBe("ffffffff")

    // // Parse Outputs
    // let txOutputs = coinbaseTx.getTransactionOutputs();
    // expect(coinbaseTx.getOutputCount()).toBe(2);
    // expect(txOutputs[0].value).toBe(2_500_000_000n); // 25 btc
    // expect(txOutputs[0].scriptPubKeySize).toBe(25);
    // expect(txOutputs[0].scriptPubKey).toBe('76a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac');

    // expect(txOutputs[1].value).toBe(0n);
    // expect(txOutputs[1].scriptPubKeySize).toBe(38);
    // expect(txOutputs[1].scriptPubKey).toBe('6a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f');

    // // SegWit
    // let witnesses = coinbaseTx.getWitnesses();
    // expect(witnesses[0].size).toBe(32);
    // expect(witnesses[0].witness).toBe('0000000000000000000000000000000000000000000000000000000000000000');
    // expect(coinbaseTx.getLockTime()).toBe(0);
    
    // // Decode Second Transaction P2P
    // expect(secondTx.getVersion()).toBe(2);
    // // Two transaction outputs are being used as inputs.
    // expect(secondTx.getInputCount()).toBe(1);
    // txInputs = secondTx.getTransactionInputs();
    // // First txOut being used as input
    // expect(txInputs[0].txId).toBe("e4e1322329820522802fb1b8dfc6fdc855a536155c7c0dd152635bfd31f1412d");
    // expect(txInputs[0].vOut).toBe(0);
    // expect(txInputs[0].scriptSigSize).toBe(106);
    // expect(txInputs[0].scriptSig).toBe("4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0");
    
    // txOutputs = secondTx.getTransactionOutputs();

    // expect(secondTx.getOutputCount()).toBe(2);
    // expect(txOutputs[0].value).toBe(4998994375n);
    // expect(txOutputs[0].scriptPubKeySize).toBe(25);
    // expect(txOutputs[0].scriptPubKey).toBe("76a91492238f7f59a783a6d1794dc635149b984c4f974288ac");

    // expect(txOutputs[1].value).toBe(1000000n);
    // expect(txOutputs[1].scriptPubKeySize).toBe(25);
    // expect(txOutputs[1].scriptPubKey).toBe("76a9140e38a704aba90db814fce3e50a69824a963f8aef88ac");

    // expect(secondTx.getLockTime()).toBe(0);
// })


// Block 1 from Bitcoin Mainnet.
test("Decode legacy p2pkh block", () => {
    
    let rawBlockData = 
        "01000000" + 
        "6fe28c0ab6f1b372c1a6a246ae63f74f931e8365e15a089c68d6190000000000" + 
        "982051fd1e4ba744bbbe680e1fee14677ba1a3c3540bf7b1cdb606e857233e0e" +
        "61bc6649" +
        "ffff001d" + 
        "01e36299" + 

        // Transactions
        "01" + // txCount
        "01000000" +  // txVersion

        // Inputs
        "01" + // inputCount
        "0000000000000000000000000000000000000000000000000000000000000000" + // txId
        "ffffffff" + // vOut
        "07" + // scriptSize
        "04ffff001d0104" + // script
        "ffffffff" + // sequence

        // Outputs
        "01" + // output count
        "00f2052a01000000" + // value
        "43" + // scriptPubKeySize
        "410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac" + 
        "00000000";

    let block = Block.parse(rawBlockData);

    let header = block.getHeader();
    let transactions = block.getTransactions();

    let firstTx = transactions[0];
    
    // Decode Header
    expect(header.getVersion()).toBe(1);
    expect(header.getPreviousBlockHash()).toBe("000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f");
    expect(header.getMerkleRootHash()).toBe("0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098");
    expect(new Date(header.getTime()*1000)).toStrictEqual(new Date("2009-01-09T02:54:25.000Z"));

    // needs to be decoded to version 1
    expect(header.getBits()).toBe("1d00ffff");
    expect(header.getNonce()).toBe(2_573_394_689);

    // // Decode First Transaction
    expect(firstTx.getVersion()).toBe(1);

    // // Parse Inputs
    expect(firstTx.getInputCount()).toBe(1);
    let txInputs = firstTx.getInputs();
    expect(txInputs[0].getTransactionId()).toBe("0000000000000000000000000000000000000000000000000000000000000000");
    expect(txInputs[0].getVOut()).toBe(4_294_967_295);
    expect(txInputs[0].getScriptSize()).toBe(7);
    expect(txInputs[0].getScript()).toBe("04ffff001d0104");
    expect(txInputs[0].getSequence()).toBe("ffffffff")

    // // Parse Outputs
    let txOutputs = firstTx.getOutputs();
    expect(firstTx.getOutputCount()).toBe(1);
    expect(txOutputs[0].getValue()).toBe(5_000_000_000n); // 25 btc
    expect(txOutputs[0].getScriptPubKeySize()).toBe(67);
    expect(txOutputs[0].getScriptPubKey()).toBe('410496b538e853519c726a2c91e61ec11600ae1390813a627c66fb8be7947be63c52da7589379515d4e0a604f8141781e62294721166bf621e73a82cbf2342c858eeac');
    expect(firstTx.getLockTime()).toBe(0);
})


test("reverse hex", () => {

    let hash = reverse(Buffer.from("bac8b0fa927c0ac8234287e33c5f74d38d354820e24756ad709d7038fc5f31f0", 'hex'));
    console.log(hash.toString('hex'));
});