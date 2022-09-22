import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper, TablePagination } from "@mui/material";
import { useState } from "react";


// TxIds, ScriptSigs, and other data is too long so we need to wrap the content
const tableStyle = {
    "& .MuiTableCell-body": {
        wordBreak: "break-all",
        maxWidth: "350px",
    },
    size: "small"
}

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
                <Table sx={tableStyle} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">Input Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>Transaction Id</TableCell>
                            <TableCell>{txInput.txId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Vout</TableCell>
                            <TableCell>{txInput.vOut}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>scriptSigSize (in bytes)</TableCell>
                            <TableCell>{txInput.scriptSigSize}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>scriptSig</TableCell>
                            <TableCell>{txInput.scriptSig}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>sequence</TableCell>
                            <TableCell>{txInput.sequence}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionInputsTable;