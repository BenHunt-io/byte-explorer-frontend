import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";


type TransactionTableProps = {
    txIds: string[]
    onClick : (e : any) => void;
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
        return txIds
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((txId: any) => {
                let txNum = page*rowsPerPage+(++count);
                return (
                    <TableRow 
                        hover
                        onClick={(e) => handleClickTransaction(e, txId)}
                        key={txId}
                        selected={isSelected(txId)}>
                        <TableCell sx={{textAlign:"center"}}>Transaction {txNum}: {shortenTxId(txId)} </TableCell>
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
        props.onClick(txId);
    }

    const isSelected = (txId: string) => txId === selected;

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer component={Paper}>
                <Table size="small">

                    <TableHead>
                        <TableRow>
                            <TableCell>Transactions</TableCell>
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