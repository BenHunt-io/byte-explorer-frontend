import type { NextPage } from 'next'
import Grid2 from '@mui/material/Unstable_Grid2';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Button from '@mui/material/Button';
import { Collapse, createTheme, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import BlankHeader from '../components/BlankHeader';
import React from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ThemeProvider } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LockClockIcon from '@mui/icons-material/LockClock';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';
import TransactionTable from '../components/pages/TransactionTable';



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
          minRows={30}
        />
      </Grid2>


      <Grid2 container justifyContent="center" sm={12} md={4}>
        <Grid2 display="flex" justifyContent="center">
          <TableContainer component={Paper}>
            <Table size="small" aria-label="simple table">

              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={3}>Header</TableCell>
                </TableRow>
              </TableHead>


              <TableBody>
                {TableData.map((row: any) => 
                  <TableRow key={row.id}>
                    <ThemeProvider theme={tableTheme}>
                      <TableCell align="center">{row.icon}</TableCell>
                      <TableCell>{row.description}</TableCell>
                      <TableCell>{row.val}</TableCell>
                    </ThemeProvider>
                </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid2>

        <Grid2 xs={12}>
          <TransactionTable txIds={transactionIds}/>
        </Grid2>

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
          wordWrap: "break-word",
          columnWidth: "160px"
        },
      },
    },
  },
})

const transactionIds = [
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

const TableData = [
    {
      id : 1,
      val: 2,
      description: "Version",
      icon : <EditIcon/>
    },
    {
      id: 2,
      val: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
      description: "Previous Block Header Hash",
      icon : <FingerprintIcon/>
    },
    {
      id: 3,
      val: "67cea7e5c4543bfe8518e27211d3d69bab59ae174bab547e7bbf5dfa1e3d19d6",
      description: "Merkle Root Hash",
      icon: <FingerprintIcon/>
    },
    {
      id: 4,
      val: "Sep 05 2022 11:52:12",
      description: "Time",
      icon: <AccessTimeIcon/>
    },
    {
      id: 5,
      val: "25",
      description: "Nbits",
      icon: <SpeedIcon/>
    },
    {
      id: 5,
      val: "3",
      description: "Nonce",
      icon: <AddIcon/>
    }
];

{/* Collapsable Inner Table */}
const InnerTable = (props : any) => {

  const [open, setOpen] = React.useState(false);

  
  return (
      
      <TableRow>
        <TableCell>
          <Collapse in={props.open} timeout="auto" unmountOnExit>
            <Table>
            <TableHead>
              <TableRow>
                <TableCell>Value</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                props.rows.map((row : any) => 
                  <ThemeProvider theme={tableTheme}>
                    <TableRow key={row.id}>
                        <TableCell>{row.val}</TableCell>
                        <TableCell>{row.description}</TableCell>
                    </TableRow>
                  </ThemeProvider>

                )
              }
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
