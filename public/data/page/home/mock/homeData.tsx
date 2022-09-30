/**
 *
 * Dummy Data Used to stub out components on the home page.
 * 
**/

// Transaction Header Table Data
const txHeaderData = {
    version: 2,
    previousBlockHeaderHash: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    merkleRootHash: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    time: new Date(),
    nBits: "25",
    nonce: 3
  }

// Transaction Id Table Data
const txIds = [
    "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "92sea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "97dea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "gd3ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "hf3ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "79gea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    "sa1ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
  ]




  const txInputs = {

    "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        from: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 100,
      },
      {
        from: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 15_500,
      },
      {
        from: "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 6_500_000,
      }
    ],
  
    "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        from: "79gea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 10_000,
      },
      {
        from: "92sea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 700,
      },
      {
        from: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 10_500_000,
      }
    ],
  
    "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        from: "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 420,
      },
      {
        from: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 1_337_000,
      },
      {
        from: "sa1ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 69_000_000,
      }
    ],
  }


  const txOutputs = {

    "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        to: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 100,
      },
      {
        to: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 15_500,
      },
      {
        to: "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 6_500_000,
      }
    ],
  
    "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        to: "79gea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 10_000,
      },
      {
        to: "92sea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 700,
      },
      {
        to: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 10_500_000,
      }
    ],
  
    "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6" : [
      {
        to: "hfdea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 420,
      },
      {
        to: "521ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 1_337_000,
      },
      {
        to: "sa1ea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
        value: 69_000_000,
      }
    ],
  }
  
  const txOutDetailData = {
    value: 69_000_000,
    scriptPubKeySize: 25,
    scriptPubKey: "76a9140e38a704aba90db814fce3e50a69824a963f8aef88ac"
  }
  
  const txInDetailData = {
    txId : "1251ASKLDLJ24123kSJGSD",
    vOut : 3,
    scriptSigSize: 30,
    scriptSig: "EJKSDJLKSJDFKLDJGKL12312312l",
    sequence: "ffffffff"
  }

  const errors = {
    blockHeaderVersion : {},
    merkleTreeHash: {},
    previousBlockHeaderHash: {},
    difficultyBits: {
      reason: "Invalid Hexidecimal Characters"
    }
  }
  

  export {txHeaderData, txIds, txInputs, txOutputs, txInDetailData, txOutDetailData};