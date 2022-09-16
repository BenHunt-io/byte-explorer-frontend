import Block from '../lib/Block';
import reverse from 'buffer-reverse';


test("Decode segwit block with transactions", () => {

    // From getblock RPC call
    let rawBlockData = 
        // Header
        "00000020" + 
        "2750bb1ccd84a7006923ce2f3a2651d64b22d907d0b2c54da103507da28bf67a" +
        "d03c856f0d8515c1b444b18bea8512b7aead6ae8db7de0cf370ca4cfb89484a1" +
        "4d550f63" + 
        "ffff7f20" +
        "01000000" +
        // tx count
        "02" +

        /*
         *  Transactions
        */ 

        // Coinbase Tx
        "02000000" + // version
        "0001" + // witness flag
        "01" + // input count
        "0000000000000000000000000000000000000000000000000000000000000000" + // txId
        "ffffffff" + // vOut
        "05" +  // scriptSize
        "02c9070101" + // scriptSig
        "ffffffff" + // sequence

        "02" + // output count

        "2f50090000000000" + // value
        "16" + // scriptPubKeySize
        "001460c8283b1d1b439a357c13dbd0f8d59654882a56" + // scriptPubKey

        "0000000000000000" + // value
        "26" + // scriptPubKeySize
        "6a24aa21a9ede412aab3cdc4da70bb935456c6f21d37d597d07cf12d142ef25a18128861d20c" + // scriptPubKey

        "01" + // witness count
        "20" +  // witness size
        "0000000000000000000000000000000000000000000000000000000000000000" + // witness
        "00000000" + //locktime

        // Transaction Two (Non-coinbase Tx)
        "02000000" + // version
        "0001" + // witness flag
        "02" + // input count

        // coinbase tx as input
        "0e7bef88f5d57222b436c34eb302c54f700c830b89e67c220e7ec1b0c8183711" + // txId
        "00000000" + // vOut (which output is being used as input)
        "00" + // verison byte?
        "fdffffff7850f49ca955e15233c611f0258dbed1fc5e061f48f2e629f76e10bd0a45f5880000000000fdffffff0240420f0000000000160014ba932a9bbea78b75" +
        "08487bf7caab5ba63309704c2eea150000000000160014ab651a3620a5bb6c3be4a887c27a366dbd09e799024730440220561b56bee29e02e9925d5cd503bae702983b2a4b91325a4fb92d121c45354626022055b295afd65e8881bc7e327e0fccdc7a028fe21a7f2ad8a200a98600ebb2dcf2012103180bf69acae2b21be0f6268c9a01f457ba6ffa2e13ffebdfaf88966a0bde21750247304402200947418ffb2f188be61cb753145b940e05240882dd0f4f2165ce8abec4a2a2cd0220048afdc516a4367fdc2d09c4912385fe4c93f5ff5758b8528befccd049e297c6012103180bf69acae2b21be0f6268c9a01f457ba6ffa2e13ffebdfaf88966a0bde217500000000";
    
// 30440220561b56bee29e02e9925d5cd503bae702983b2a4b91325a4fb92d121c45354626022055b295afd65e8881bc7e327e0fccdc7a028fe21a7f2ad8a200a98600ebb2dcf201
    


    let block = new Block(rawBlockData);

    let headerFields = block.getHeader().getFields();
    let transactions = block.getTransactions();
    let coinbaseTx = transactions[0];
    let secondTx = transactions[1];
    

    // Decode Header
    expect(headerFields.version).toBe(32);
    expect(headerFields.previousBlockHash).toBe("2750bb1ccd84a7006923ce2f3a2651d64b22d907d0b2c54da103507da28bf67a");
    expect(headerFields.merkleRoot).toBe("d03c856f0d8515c1b444b18bea8512b7aead6ae8db7de0cf370ca4cfb89484a1");
    expect(new Date(headerFields.time*1000)).toStrictEqual(new Date("2022-08-31T12:34:21.000Z"));
    expect(headerFields.bits).toBe("207fffff");
    expect(headerFields.nonce).toBe(1);

    // Decode Coinbase Transaction
    expect(coinbaseTx.getVersion()).toBe(2);
    expect(coinbaseTx.isWitnessFlagPresent()).toBe(true);
    
    // Parse Inputs
    expect(coinbaseTx.getInputCount()).toBe(1);
    let txInputs = coinbaseTx.getTransactionInputs();
    expect(txInputs[0].txId).toBe("0000000000000000000000000000000000000000000000000000000000000000");
    expect(txInputs[0].vOut).toBe(4_294_967_295);
    expect(txInputs[0].scriptSigSize).toBe(5);
    expect(txInputs[0].scriptSig).toBe("02c9070101");
    expect(txInputs[0].sequence).toBe("ffffffff")

    // Parse Outputs
    let txOutputs = coinbaseTx.getTransactionOutputs();
    expect(coinbaseTx.getOutputCount()).toBe(2);
    expect(txOutputs[0].value).toBe(610_351n);
    expect(txOutputs[0].scriptPubKeySize).toBe(22);
    expect(txOutputs[0].scriptPubKey).toBe('001460c8283b1d1b439a357c13dbd0f8d59654882a56');

    expect(txOutputs[1].value).toBe(0n);
    expect(txOutputs[1].scriptPubKeySize).toBe(38);
    expect(txOutputs[1].scriptPubKey).toBe('6a24aa21a9ede412aab3cdc4da70bb935456c6f21d37d597d07cf12d142ef25a18128861d20c');

    // SegWit
    let witnesses = coinbaseTx.getWitnesses();
    expect(witnesses[0].size).toBe(32);
    expect(witnesses[0].witness).toBe('0000000000000000000000000000000000000000000000000000000000000000');
    expect(coinbaseTx.getLockTime()).toBe(0);


    // Decode Second Transaction P2P
    expect(secondTx.getVersion()).toBe(2);
    expect(secondTx.isWitnessFlagPresent()).toBe(true);

    // Two transaction outputs are being used as inputs.
    expect(secondTx.getInputCount()).toBe(2);
    txInputs = secondTx.getTransactionInputs();
    // First txOut being used as input
    expect(txInputs[0].txId).toBe("113718c8b0c17e0e227ce6890b830c704fc502b34ec336b42272d5f588ef7b0e");
    expect(txInputs[0].vOut).toBe(0);


})



test("Decode legacy p2pkh block", () => {
    

    // Raw Block Data: 00000030bde62aefc73fce5ce54365131d5a8a03529d51c2a4eb1730fb7d87aac918df63ea6fd6e28794dd0594b0bdb60869c11b509d0a605c1ec4509937ca45a30d555a546e1363ffff7f200500000002020000000001010000000000000000000000000000000000000000000000000000000000000000ffffffff0502de000101ffffffff0200f90295000000001976a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac0000000000000000266a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f012000000000000000000000000000000000000000000000000000000000000000000000000002000000012d41f131fd5b6352d10d7c5c1536a555c8fdc6dfb8b12f80220582292332e1e4000000006a4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0fdffffff02c799f629010000001976a91492238f7f59a783a6d1794dc635149b984c4f974288ac40420f00000000001976a9140e38a704aba90db814fce3e50a69824a963f8aef88ac00000000

    let rawBlockData = 
        /**
         * Header
         */
        "00000030" + // header version
        "bde62aefc73fce5ce54365131d5a8a03529d51c2a4eb1730fb7d87aac918df63" + // previous block hash
        "ea6fd6e28794dd0594b0bdb60869c11b509d0a605c1ec4509937ca45a30d555a" + // merkle root hash
        "546e1363" + // mined datetime
        "ffff7f20" + // difficulty bits
        "05000000" + // nonce 
        
        /**
         * Transactions
         */
        "02" + // transaction count

        // *** Coinbase Transaction ***
        "02000000" + // transaction version
        "0001" + // witness flag
        "01" + // input count
        "0000000000000000000000000000000000000000000000000000000000000000" + // transaction id
        "ffffffff" + // vOut
        "05" + // script size 
        "02de000101" + // script sig
        "ffffffff" + // sequence 

        "02" + // output count
        "00f9029500000000" + // value 
        "19" + // locking script size (scriptPubKey)
        "76a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac" + // locking script
        "0000000000000000" + // value
        "26" + // locking script size (scriptPubKey)
        "6a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f" + // locking script
        "01" + // witness count
        "20" + // witness size
        "0000000000000000000000000000000000000000000000000000000000000000" + // witness
        "00000000" + // lock time

        // *** Legacy Transaction P2PKH ***
        "02000000" + // version
        "01" + // input count 
        "2d41f131fd5b6352d10d7c5c1536a555c8fdc6dfb8b12f80220582292332e1e4" +  // transaction id
        "00000000" + // vout
        "6a" + // unlocking code size (script sig size)
        // unlock code ( unlocking script)
        "4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0" +
        "fdffffff" + // sequence

        "02" + // output count
        "c799f62901000000" + // value
        "19" + // scriptPubKey size
        "76a91492238f7f59a783a6d1794dc635149b984c4f974288ac" + // scriptPubKey
        "40420f0000000000" + // value
        "19" + // scriptPubKey size
        "76a9140e38a704aba90db814fce3e50a69824a963f8aef88ac" +  // scriptPubKey
        "00000000"; // locktime
    
    let block = new Block(rawBlockData);

    let headerFields = block.getHeader().getFields();
    let transactions = block.getTransactions();
    let coinbaseTx = transactions[0];
    let secondTx = transactions[1];
    

    // Decode Header
    expect(headerFields.version).toBe(48);
    expect(headerFields.previousBlockHash).toBe("63df18c9aa877dfb3017eba4c2519d52038a5a1d136543e55cce3fc7ef2ae6bd");
    expect(headerFields.merkleRoot).toBe("5a550da345ca379950c41e5c600a9d501bc16908b6bdb09405dd9487e2d66fea");
    expect(new Date(headerFields.time*1000)).toStrictEqual(new Date("2022-09-03T15:10:12.000Z"));
    expect(headerFields.bits).toBe("207fffff");
    expect(headerFields.nonce).toBe(5);

    // Decode Coinbase Transaction
    expect(coinbaseTx.getVersion()).toBe(2);
    expect(coinbaseTx.isWitnessFlagPresent()).toBe(true);
    
    // Parse Inputs
    expect(coinbaseTx.getInputCount()).toBe(1);
    let txInputs = coinbaseTx.getTransactionInputs();
    expect(txInputs[0].txId).toBe("0000000000000000000000000000000000000000000000000000000000000000");
    expect(txInputs[0].vOut).toBe(4_294_967_295);
    expect(txInputs[0].scriptSigSize).toBe(5);
    expect(txInputs[0].scriptSig).toBe("02de000101");
    expect(txInputs[0].sequence).toBe("ffffffff")

    // Parse Outputs
    let txOutputs = coinbaseTx.getTransactionOutputs();
    expect(coinbaseTx.getOutputCount()).toBe(2);
    expect(txOutputs[0].value).toBe(2_500_000_000n); // 25 btc
    expect(txOutputs[0].scriptPubKeySize).toBe(25);
    expect(txOutputs[0].scriptPubKey).toBe('76a914bf96f5870fbeb14ff2b4849ceb40bce35d03328688ac');

    expect(txOutputs[1].value).toBe(0n);
    expect(txOutputs[1].scriptPubKeySize).toBe(38);
    expect(txOutputs[1].scriptPubKey).toBe('6a24aa21a9ededf43ca4b0894b83bd714fb9a0e613c2f87c038c60a36091ec01338d8d91229f');

    // SegWit
    let witnesses = coinbaseTx.getWitnesses();
    expect(witnesses[0].size).toBe(32);
    expect(witnesses[0].witness).toBe('0000000000000000000000000000000000000000000000000000000000000000');
    expect(coinbaseTx.getLockTime()).toBe(0);
    
    // Decode Second Transaction P2P
    expect(secondTx.getVersion()).toBe(2);
    // Two transaction outputs are being used as inputs.
    expect(secondTx.getInputCount()).toBe(1);
    txInputs = secondTx.getTransactionInputs();
    // First txOut being used as input
    expect(txInputs[0].txId).toBe("e4e1322329820522802fb1b8dfc6fdc855a536155c7c0dd152635bfd31f1412d");
    expect(txInputs[0].vOut).toBe(0);
    expect(txInputs[0].scriptSigSize).toBe(106);
    expect(txInputs[0].scriptSig).toBe("4730440220108a90b9a3d7c0af2df2ca4a755f1c840cf3eeea11f9f2172c363edcdb0582e302207d2900f809560315103b0f6f4911b11c2e43ccb6d37dafa127a1907cfca0194f01210371ec78c8cedc234c1eec594c28a957e7917ed4d404e7907893488ec0fcdddac0");
    
    txOutputs = secondTx.getTransactionOutputs();

    expect(secondTx.getOutputCount()).toBe(2);
    expect(txOutputs[0].value).toBe(4998994375n);
    expect(txOutputs[0].scriptPubKeySize).toBe(25);
    expect(txOutputs[0].scriptPubKey).toBe("76a91492238f7f59a783a6d1794dc635149b984c4f974288ac");

    expect(txOutputs[1].value).toBe(1000000n);
    expect(txOutputs[1].scriptPubKeySize).toBe(25);
    expect(txOutputs[1].scriptPubKey).toBe("76a9140e38a704aba90db814fce3e50a69824a963f8aef88ac");

    expect(secondTx.getLockTime()).toBe(0);



})
