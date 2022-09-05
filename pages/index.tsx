import type { NextPage } from 'next'
import Grid2 from '@mui/material/Unstable_Grid2';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import { Collapse, createTheme, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import BlankHeader from '../components/BlankHeader';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@emotion/react';



function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Home: NextPage = () => {

  const [headerOpen, setHeaderOpen] = React.useState(false);
  const [txsOpen, setTxsOpen] = React.useState(false);



  return (
    <Grid2 container justifyContent="center" spacing={2}>
–

      {/* Blank Header to push down the other components from the top */}
      <Grid2 xs={12}>
        <BlankHeader />
      </Grid2>

      <Grid2 display="flex" justifyContent="center" sm={12} md={4}>
        <TextField
          label="Block Data"
          fullWidth
          multiline
          minRows={10}
        />
      </Grid2>



      <Grid2 display="flex" justifyContent="center" sm={12} md={4}>
        <TableContainer component={Paper}>
          <Table  aria-label="simple table">


            <TableBody>
              <React.Fragment key="Header">
                <CollapsableTableHeader title="Header" open={headerOpen} setOpen={setHeaderOpen}/>
                <InnerTable rows={TableData} open={headerOpen} />
              </React.Fragment>
              <React.Fragment key="Transactions">
                <CollapsableTableHeader title="Transactions" open={txsOpen} setOpen={setTxsOpen}/>
                <InnerTable rows={TableData} open={txsOpen} />
              </React.Fragment>
            </TableBody>



          </Table>
        </TableContainer>
      </Grid2>




    </Grid2>
  )
}

const tableTheme = createTheme({
  components: {
    // Name of the component
    MuiTableCell: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          columnWidth : "160px",
          wordWrap: "break-word"
        },
      },
    },
  },
})

const TableData = [
    {
      id : 1,
      val: 2,
      description: "Version"
    },
    {
      id: 2,
      val: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
      description: "Tx Id"
    }
];

{/* Collapsable Inner Table */}
const InnerTable = (props : any) => {

  const [open, setOpen] = React.useState(false);

  
  return (
      
      <TableRow>
        <TableCell>
          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.rows.map((row : any) => 
                  <TableRow key={row.id}>
                    <ThemeProvider theme={tableTheme}>
                      <TableCell>{row.val}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      </ThemeProvider>
                  </TableRow>
                )
              }
              <React.Fragment key="TxInputs">
                <CollapsableTableHeader title="Transaction Inputs" open={open} setOpen={setOpen}/>
                <InnerTable rows={TableData} open={open}/>
              </React.Fragment>
              <React.Fragment key="TxOutputs">
                <CollapsableTableHeader title="Transaction Outputs" open={open} setOpen={setOpen}/>
                <InnerTable rows={TableData} open={open}/>
              </React.Fragment>
            </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
  )
}

{/* Table Header (Header, Transactions) */}
const CollapsableTableHeader = (props : any) => {  

  return(
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell size="small">
          <IconButton
            size="small"
            onClick={() => props.setOpen(!props.open)}
          >
            {props.open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          {props.title}
        </TableCell>
      </TableRow>
  )
}

export default Home
