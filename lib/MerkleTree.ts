export default class MerkleTree {

    static async computeHash(txIds : string[]) {

        // Make an even number of hashes, duplicate last hash if needed.
        if(txIds.length % 2 != 0){
            txIds.push(txIds[txIds.length-1]);
        }

        let hashes = txIds;

        // Keep hashing pairs of hashes until we are left with one final hash
        while(hashes.length > 1){

            let hash : string = hashes.shift()!;
            let hashOther : string = hashes.shift()!;

            const hashResult = await MerkleTree.hashTwice(hash+hashOther);

            hashes.push(hashResult);
        }

        return hashes.pop()!;
    }

    static async hashTwice(input : string) {

        console.log(window.crypto);
        let hashBuffer = await window.crypto.subtle.digest('SHA-256', Buffer.from(input, 'hex'));
        let firstHash = Buffer.from(hashBuffer).toString('hex');


        hashBuffer =  await window.crypto.subtle.digest('SHA-256', Buffer.from(firstHash, 'hex'));
        let secondHash = Buffer.from(hashBuffer).toString('hex');

        return secondHash;
    }
}