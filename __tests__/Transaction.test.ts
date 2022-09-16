import Transaction from "../lib/transaction/Transaction";
import crypto from "crypto";
import BYOBReader from "../lib/BYOBReader";


// Transaction where 5 btc are sent from person A to person B
test('Parse Transaction', () => {

    let rawTx = "020000000001011c0660454e23c9c28089c2642435a7b4a4e4a115051a6b01420a900f3e9db9270100000000ffffffff020065cd1d000000001600149e99c1cf8402f0e28934c0caa07b81211bac22050000000000000000036a01990247304402205e783972da1e5f59c40004b1b772caf5d9381c6c2c800f9ef1b41f788f0f67310220318d980e36af59521dc687fbc0eb51e5bfe6758bd31b2ca7871833c28705035f012103ec9d1988a492ece0632c7dfb79c1d414b45d7f99c694ddbc2d8932d70910ffb900000000";

    let tx = Transaction.create(rawTx, false)

    expect(tx.getVersion()).toBe(2);
    expect(tx.isWitnessFlagPresent()).toBe(true);
    
    // Parse Inputs
    expect(tx.getInputCount()).toBe(1);
    let txInputs = tx.getTransactionInputs();
    expect(txInputs[0].txId).toBe("27b99d3e0f900a42016b1a0515a1e4a4b4a7352464c28980c2c9234e4560061c");
    expect(txInputs[0].vOut).toBe(1);
    expect(txInputs[0].scriptSigSize).toBe(0);
    expect(txInputs[0].scriptSig).toBe("");
    expect(txInputs[0].sequence).toBe("ffffffff")

    // Parse Outputs
    let txOutputs = tx.getTransactionOutputs();
    expect(tx.getOutputCount()).toBe(2);
    expect(txOutputs[0].value).toBe(500_000_000n);
    expect(txOutputs[0].scriptPubKeySize).toBe(22);
    expect(txOutputs[0].scriptPubKey).toBe('00149e99c1cf8402f0e28934c0caa07b81211bac2205');

    expect(txOutputs[1].value).toBe(0n);
    expect(txOutputs[1].scriptPubKeySize).toBe(3);
    expect(txOutputs[1].scriptPubKey).toBe('6a0199');

    // SegWit
    let witnesses = tx.getWitnesses();
    expect(witnesses[0].size).toBe(71);
    expect(witnesses[0].witness).toBe('304402205e783972da1e5f59c40004b1b772caf5d9381c6c2c800f9ef1b41f788f0f67310220318d980e36af59521dc687fbc0eb51e5bfe6758bd31b2ca7871833c28705035f01');

    expect(witnesses[1].size).toBe(33);
    expect(witnesses[1].witness).toBe('03ec9d1988a492ece0632c7dfb79c1d414b45d7f99c694ddbc2d8932d70910ffb9')

    expect(tx.getLockTime()).toBe(0);

})

test('Parse Legacy P2PKH Transaction Id with raw string input', async () => {

    // browser based crypto api not available in nodeJS, so we need to mock this API with the API NodeJS implements
    Object.defineProperty(global.self, "crypto", {
        value: {
            subtle: crypto.webcrypto.subtle,
        },
    });

    let rawTx = "02000000016de9eb5caef707de2ea00cf16b8d12d368588f0ee9dd4ada9e6a8ae15c8dae54000000006a473044022065de235530a1041367152463d67d718bc09618f979fa9c76ce5a787bdb3a61eb022033ab1999ee5eab0f9d9c3975e2b76974a6a83c685b1f9e4bf8af99550de11a330121022d15f8d96d277f11bc2cd44779caea394f0019c5ae778e2b31a76d443964019afdffffff0240420f00000000001976a9141ec8270270dd31d3c1e501079e45be9737c72ed588acc799f629010000001976a9140c83e3516d0ae7b0b1f0940e6e2965cb4c233c5688ac00000000";

    let tx = Transaction.create(rawTx, false)

    let txId =  await tx.getTxId();
    // TxId's are in little endian byte order
    let txIdLE = Buffer.from(txId, 'hex').reverse().toString('hex');
    expect(txIdLE).toBe("8a9206f3c43194b3fcddb8972cd19bf28902ce43ef0003216729c948af99e694")
})


test('Parse Legacy P2PKH Transaction Id using BYOBReader', async () => {

    // browser based crypto api not available in nodeJS, so we need to mock this API with the API NodeJS implements
    Object.defineProperty(global.self, "crypto", {
        value: {
            subtle: crypto.webcrypto.subtle,
        },
    });

    
    let rawTx = "02000000016de9eb5caef707de2ea00cf16b8d12d368588f0ee9dd4ada9e6a8ae15c8dae54000000006a473044022065de235530a1041367152463d67d718bc09618f979fa9c76ce5a787bdb3a61eb022033ab1999ee5eab0f9d9c3975e2b76974a6a83c685b1f9e4bf8af99550de11a330121022d15f8d96d277f11bc2cd44779caea394f0019c5ae778e2b31a76d443964019afdffffff0240420f00000000001976a9141ec8270270dd31d3c1e501079e45be9737c72ed588acc799f629010000001976a9140c83e3516d0ae7b0b1f0940e6e2965cb4c233c5688ac00000000";
    let reader = new BYOBReader(rawTx, 'hex');

    let tx = Transaction.createFromReader(reader, false);

    let txId =  await tx.getTxId();
    // TxId's are in little endian byte order
    let txIdLE = Buffer.from(txId, 'hex').reverse().toString('hex');
    expect(txIdLE).toBe("8a9206f3c43194b3fcddb8972cd19bf28902ce43ef0003216729c948af99e694")
})
