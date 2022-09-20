import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper, TablePagination, styled } from "@mui/material";
import { useState } from "react";
import ColoredMoney from "../../common/ColoredMoney";

export type TransactionOutSummary = {
    to : string,
    value : number
}

type TransactionOutTableProps = {
    txOutputs : TransactionOutSummary[]
    // recieve state hook to set the selected transaction input visibile to the parent componet
    setTxOutputSelected : React.Dispatch<React.SetStateAction<string | undefined>>
}

const TransactionOutTable = (props: TransactionOutTableProps) => {

    const [rowsPerPage, setRowsPerPage] = useState(3);
    const [page, setPage] = useState(0);
    const [selected, setSelected] = useState<string>();

    const shortenTxId = (txId: string) => {
        return txId.slice(0, 3) + "..." + txId.slice(txId.length-3, txId.length);
    };

    const handleChangeRowsPerPage = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
        
    }

    const handleChangePage = (e: any, newPage: number) => {
        setPage(newPage);
    }

    const handleClickTransaction = (e: React.SyntheticEvent, txId: string) => {
        setSelected(txId);
        props.setTxOutputSelected(txId);
    }

    const isSelected = (txInput : TransactionOutSummary) => txInput.to === selected;

    const createTableRows = (txInputs : TransactionOutSummary[]) => {
        let count = 0;
        return txInputs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((txInput: TransactionOutSummary) => {
                let txNum = page*rowsPerPage+(++count);
                return (
                    <TableRow 
                        hover
                        onClick={(e) => handleClickTransaction(e, txInput.to)}
                        key={txInput.to}
                        selected={isSelected(txInput)}>
                        <TableCell align="center">Transaction {txNum}: {shortenTxId(txInput.to)} </TableCell>
                        <TableCell align="center"><ColoredMoney value={txInput.value}/></TableCell>
                    </TableRow>
                );
            });
    }

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">Out</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>to</TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createTableRows(props.txOutputs)}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={3}
                rowsPerPage={3}
                page={0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )

}


export default TransactionOutTable;