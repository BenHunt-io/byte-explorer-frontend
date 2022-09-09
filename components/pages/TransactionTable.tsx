import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/system/Box/Box";
import React, { useState } from "react";
import TransactionInputsTable from "./TransactionInputsTable";
import TransactionOutputsTable from "./TransactionOutputsTable";



const TransactionTable = (props: any) => {

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<string>();

    const shortenTxId = (txId: string) => {
        return txId.slice(0, 3) + "..." + txId.slice(txId.length-3, txId.length);
    };

    const createTableRows = (txIds : string[]) => {
        let count = 0;
        return props.txIds
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((txId: any) => {
                let txNum = page*rowsPerPage+(++count);
                return (
                    <TableRow 
                        hover
                        onClick={(e) => handleClickTransaction(e, txId)}
                        key={txId}
                        selected={isSelected(txId)}>
                        <TableCell align="center">Transaction {txNum}: {shortenTxId(txId)} </TableCell>
                    </TableRow>
                );
            });
    }

    const handleChangeRowsPerPage = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
        
    }

    const handleChangePage = (e: any, newPage: number) => {
        setPage(newPage);
    }

    const handleClickTransaction = (e: React.SyntheticEvent, rowName: string) => {
        setSelected(rowName);
    }

    const isSelected = (txId: string) => txId === selected;

    function TransactionInputs (props : any) {
        if(selected){
            return <TransactionInputsTable
                txInput={{
                    txId : "asd...123",
                    vOut : 12,
                    scriptSigSize: 23,
                    scriptSig: "10238d09f8sdfsdjfsdjlf1233123",
                    sequence: "ffffffff"
                }}    
            />
        }
        return null;
    }

    return (
            <Grid2 container>
                <Grid2 xs={12} paddingLeft={0} paddingRight={0}>
                        <Paper sx={{ width: '100%'}}>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="simple table">

                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Transactions</TableCell>
                                        </TableRow>

                                    </TableHead>


                                    <TableBody>
                                        {createTableRows(props.txIds)}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={props.txIds.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                </Grid2>
                <Grid2 xs={12}  paddingLeft={0} paddingRight={0}>
                        <TransactionInputs/>
                </Grid2>
                <Grid2 xs={12}  paddingLeft={0} paddingRight={0}>
                        <TransactionOutputsTable/>
                </Grid2>
            </Grid2>

    );

}



export default TransactionTable;