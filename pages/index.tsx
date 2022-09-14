import type { NextPage } from 'next'
import Grid2 from '@mui/material/Unstable_Grid2';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import { Collapse, createTheme, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextFieldPropsSizeOverrides } from '@mui/material';
import React, { useEffect } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LockClockIcon from '@mui/icons-material/LockClock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from '../components/pages/home/TransactionTable';
import TransactionInTable from '../components/pages/home/TransactionInTable';
import TransactionOutputsTable from '../components/pages/home/TransactionOutputsTable';
import TransactionOutTable from '../components/pages/home/TransactionOutTable';
import TransactionInputsTable from '../components/pages/home/TransactionInputsTable';
import {TransactionHeaderTable,  TransactionHeaderModel } from '../components/pages/home/TransactionHeaderTable';
import Block from '../lib/Block';

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

//
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


function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}


const Home: NextPage = () => {

  const [rawBlockData, setRawBlockData] = React.useState<string>("");

  // Decoded Block State
  const [header, setHeader] = React.useState<TransactionHeaderModel>(txHeaderData);

  const [txSelected, setTxSelected] = React.useState<undefined | string>();
  const [txInputSelected, setTxInputSelected] = React.useState<undefined | string>();
  const [txOutputSelected, setTxOutputSelected] = React.useState<undefined | string>();

  const isTxSelected = () => txSelected;
  const isTxInputSelected = () => txInputSelected;
  const isTxOutputSelected = () => txOutputSelected;


  const getTransactionInput = (txId : string | undefined) => {
    const result = Object.entries(txInputs).find(([txIdentifier]) => txIdentifier === txId);
    if(result){
      return result[1];
    }

    return [];
  }

  const handleBlockDataInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRawBlockData(e.currentTarget.value);

    console.log(rawBlockData);
    // decode header
    let block = new Block(rawBlockData);
    let header = block.getHeader().getFields();
    setHeader({
      version: header.version,
      previousBlockHeaderHash: header.previousBlockHash,
      merkleRootHash: header.merkleRoot,
      time: new Date(header.time*1000),
      nBits: header.bits,
      nonce: header.nonce,
    })
  }

  return (
    <Grid2 container justifyContent="center" sx={{marginTop: 15}} spacing={3}>

      <Grid2 xs={4} textAlign="center">
        <h1>Bitcoin Byte Explorer</h1>
      </Grid2>
      <Grid2 xs={12} padding="0px 0px 0px 0px"/>


      <Grid2 maxWidth="600px" xs={4}>
        <TextField
          value={rawBlockData}
          onChange={(e) => handleBlockDataInputChange(e)}
          label="Block Data"
          fullWidth
          multiline
          minRows={25}
          maxRows={25}
        />
      </Grid2>


      <Grid2 container xs={4} maxWidth="624px">
        <Grid2 xs={12}>
          <TransactionHeaderTable
            txHeader={header}
          />
        </Grid2>

        <Grid2 xs={12}>
          <TransactionTable 
            setTxSelected={setTxSelected}
            txIds={txIds}
          />
        </Grid2>
      </Grid2>

      <Grid2 xs={12} padding="0px 0px 0px 0px"/>


      { isTxSelected() ? (
        <>
          <Grid2 xs={4} maxWidth="600px">
              <TransactionInTable 
                setTxInputSelected={setTxInputSelected}
                txInputs={getTransactionInput(txSelected)}
              />
          </Grid2>
          <Grid2 xs={4} maxWidth="600px">
              <TransactionOutTable />
          </Grid2>
        </> ) : undefined
      }


      <Grid2 xs={12} padding="0px 0px 0px 0px"/>


      { isTxInputSelected() ?
      <Grid2 xs={4} maxWidth="600px">
          <TransactionInputsTable
            txInputs={[{
              txId : "1251ASKLDLJ24123kSJGSD",
              vOut : 3,
              scriptSigSize: 30,
              scriptSig: "EJKSDJLKSJDFKLDJGKL12312312l",
              sequence: "ffffffff"
            }]}
           />
      </Grid2> : undefined
      }

      { isTxOutputSelected() ? 
      <Grid2 md={4} maxWidth="600px">
          <TransactionOutputsTable />
      </Grid2> : undefined
      }
      
      <Grid2 xs={12} padding="0px 0px 0px 0px"/>



    </Grid2>
  )
}


const TableData = [
  {
    id: 1,
    val: 2,
    description: "Version",
    icon: <EditIcon />
  },
  {
    id: 2,
    val: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    description: "Previous Block Header Hash",
    icon: <FingerprintIcon />
  },
  {
    id: 3,
    val: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
    description: "Merkle Root Hash",
    icon: <FingerprintIcon />
  },
  {
    id: 4,
    val: "Sep 05 2022 11:52:12",
    description: "Time",
    icon: <AccessTimeIcon />
  },
  {
    id: 5,
    val: "25",
    description: "Nbits",
    icon: <SpeedIcon />
  },
  {
    id: 5,
    val: "3",
    description: "Nonce",
    icon: <AddIcon />
  }
];


export default Home
