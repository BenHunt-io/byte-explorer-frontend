import Block from '../lib/Block';

test("Decode block with transactions", () => {

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

        "0e7bef88f5d57222b436c34eb302c54f700c830b89e67c220e7ec1b0c8183711" + // txId
        "00000000" + // vOut

        "00fdffffff7850f49ca955e15233c611f0258dbed1fc5e061f48f2e629f76e10bd0a45f5880000000000fdffffff0240420f0000000000160014ba932a9bbea78b7508487bf7caab5ba63309704c2eea150000000000160014ab651a3620a5bb6c3be4a887c27a366dbd09e799024730440220561b56bee29e02e9925d5cd503bae702983b2a4b91325a4fb92d121c45354626022055b295afd65e8881bc7e327e0fccdc7a028fe21a7f2ad8a200a98600ebb2dcf2012103180bf69acae2b21be0f6268c9a01f457ba6ffa2e13ffebdfaf88966a0bde21750247304402200947418ffb2f188be61cb753145b940e05240882dd0f4f2165ce8abec4a2a2cd0220048afdc516a4367fdc2d09c4912385fe4c93f5ff5758b8528befccd049e297c6012103180bf69acae2b21be0f6268c9a01f457ba6ffa2e13ffebdfaf88966a0bde217500000000";

    


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


    // Decode Coinbase Transaction
    expect(secondTx.getVersion()).toBe(2);
    expect(secondTx.isWitnessFlagPresent()).toBe(true);

    expect(secondTx.getInputCount()).toBe(2);
    txInputs = secondTx.getTransactionInputs();
    expect(txInputs[0].txId).toBe("113718c8b0c17e0e227ce6890b830c704fc502b34ec336b42272d5f588ef7b0e");
    expect(txInputs[0].vOut).toBe(0);
})