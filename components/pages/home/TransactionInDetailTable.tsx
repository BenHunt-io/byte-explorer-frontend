import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper, TablePagination } from "@mui/material";
import { useState } from "react";


export type TransactionInputDetail = {
    txId : string,
    vOut : number,
    scriptSigSize: number,
    scriptSig: string,
    sequence: string
}

type TransactionInputTableProps = {
    txInput : TransactionInputDetail
}

const TransactionInputsTable = (props: TransactionInputTableProps) => {

    const {txInput} = props;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleChangeRowsPerPage = (e : React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(e.target.value));
        setPage(0);
        
    }

    const handleChangePage = (e: any, newPage: number) => {
        setPage(newPage);
    }


    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">Input Detail</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{txInput.txId}</TableCell>
                            <TableCell>Transaction Id</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txInput.vOut}</TableCell>
                            <TableCell>Vout</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txInput.scriptSigSize}</TableCell>
                            <TableCell>scriptSigSize (in bytes)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txInput.scriptSig}</TableCell>
                            <TableCell>scriptSig</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txInput.sequence}</TableCell>
                            <TableCell>sequence</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionInputsTable;