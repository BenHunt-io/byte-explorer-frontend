import type { NextPage } from 'next'
import Grid2 from '@mui/material/Unstable_Grid2';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Collapse, createTheme, CssBaseline, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, TextFieldPropsSizeOverrides } from '@mui/material';
import React, { useEffect } from 'react';
import { ThemeProvider } from '@emotion/react';
import TransactionTable from '../components/pages/home/TransactionTable';
import TransactionInTable, { TransactionInputSummary } from '../components/pages/home/TransactionInTable';
import TransactionOutTable, { TransactionOutSummary } from '../components/pages/home/TransactionOutTable';
import {TransactionHeaderTable,  TransactionHeaderModel } from '../components/pages/home/TransactionHeaderTable';
import Block from '../lib/Block';
import TransactionOutDetailTable from '../components/pages/home/TransactionOutDetailTable';
import TransactionInDetailTable, { TransactionInput } from '../components/pages/home/TransactionInDetailTable';
import { txInputs, txOutputs, txIds, txInDetailData, txOutDetailData, txHeaderData } from '../public/data/page/home/mock/homeData';
import { Key } from '@mui/icons-material';
import Transaction from '../lib/transaction/Transaction';


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    // Name of the component
    MuiTableCell: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          wordWrap: "break-word",
          columnWidth: "160px"
        },
      },
    },
  },
});



const Home: NextPage = () => {

  const [rawBlockData, setRawBlockData] = React.useState<string>("");
  const [block, setBlock] = React.useState<Block | undefined>();

  // Decoded Block Data that is displayed in the decoded table data.
  const [header, setHeader] = React.useState<TransactionHeaderModel>();
  const [txIds, setTxIds] = React.useState<string[]>([]);
  const [txInputSummaries, setTxInputSummaries] = React.useState<TransactionInputSummary[]>([]);
  const [txOutputSummaries, setTxOutputSummaries] = React.useState<TransactionOutSummary[]>([]);

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

  const getTransactionOutput = (txId : string | undefined) => {
    const result = Object.entries(txOutputs).find(([txIdentifier]) => txIdentifier === txId);
    if(result){
      return result[1];
    }
    return [];
  }

  /**
   * 
   */
  const onTxSelected = (txId: string) => {

    setTxSelected(txId);


    // Find and set transaction inputs
    let txIns = block?.getTransactions()
      .find(tx => tx.getTxId() === txId)?.getTransactionInputs()
      .map(selectedTx => ({
        from: selectedTx.txId,
        value: 0 // need to query blockchain for actual txValue for inputs
      }))

    if(txIns){
      setTxInputSummaries(txIns);
    }

    // Find and set transaction outputs
    let txOuts = block?.getTransactions()
      .find(tx => tx.getTxId() === txId)?.getTransactionOutputs()
      .map(selectedTx => ({
        to: selectedTx.scriptPubKey, // need to extract out the txId from script
        value: Number(selectedTx.value) // need to query blockchain for actual txValue for inputs
    }))

    if(txOuts){
      setTxOutputSummaries(txOuts);
    }

  }


  /**
   * Changes to the block data input field
   */
  const handleBlockDataInputChange = (e : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {

    let newRawBlockInput = e.currentTarget.value;
        
    setRawBlockData(newRawBlockInput);

    // decode block
    let block = new Block(newRawBlockInput);
    // initialize the txIds in the block and then set the block state
    block.getTransactions().forEach((tx) => {
      tx.initializeTxId().then(() => {

        let txIds = block.getTransactions()
          .map(tx => tx.getTxId())
        
        setBlock(block);
        setTxIds(txIds);
      })
    })

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
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>

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
              onClick={onTxSelected}
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
                  txInputs={txInputSummaries}
                />
            </Grid2>
            <Grid2 xs={4} maxWidth="600px">
                <TransactionOutTable 
                  setTxOutputSelected={setTxOutputSelected}
                  txOutputs={txOutputSummaries}
                />
            </Grid2>
          </> ) : undefined
        }


        <Grid2 xs={12} padding="0px 0px 0px 0px"/>


        { isTxInputSelected() ?
        <Grid2 xs={4} maxWidth="600px">
            <TransactionInDetailTable
              txInput={txInDetailData}
            />
        </Grid2> : undefined
        }

        { isTxOutputSelected() ? 
        <Grid2 md={4} maxWidth="600px">
            <TransactionOutDetailTable
              txOutDetail={txOutDetailData}
            />
        </Grid2> : undefined
        }
        
        <Grid2 xs={12} padding="0px 0px 0px 0px"/>



      </Grid2>
    </ThemeProvider>
  )
}


export default Home
