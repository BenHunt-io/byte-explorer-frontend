import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import Box from "@mui/system/Box/Box";
import React, { useState } from "react";
import TransactionInputsTable from "./TransactionInputsTable";
import TransactionInTable from "./TransactionInTable";
import TransactionOutputsTable from "./TransactionOutputsTable";
import TransactionOutTable from "./TransactionOutTable";


type TransactionTableProps = {
    txIds: string[]
    // recieve state hook to set the selected transaction visibile to the parent componet
    setTxSelected : React.Dispatch<React.SetStateAction<string | undefined>>
}

const TransactionTable = (props: TransactionTableProps) => {

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

    const handleClickTransaction = (e: React.SyntheticEvent, txId: string) => {
        setSelected(txId);
        props.setTxSelected(txId);
    }

    const isSelected = (txId: string) => txId === selected;

    function TransactionInputs (props : any) {
        if(selected){
            return <TransactionInputsTable
                txInputs={[{
                    txId : "asd...123",
                    vOut : 12,
                    scriptSigSize: 23,
                    scriptSig: "10238d09f8sdfsdjfsdjlf1233123",
                    sequence: "ffffffff"
                }]}    
            />
        }
        return null;
    }

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer component={Paper}>
                <Table size="small">

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
    );
}



export default TransactionTable;