import { Table, TableCell, TableHead, TableContainer, TableBody, Paper, TablePagination, TableRow } from "@mui/material";
import { useState } from "react";
import ColoredMoney from "../../common/ColoredMoney";

export type TransactionInputSummary = {
    from : string,
    value : number
}

type TransactionInTableProps = {
    txInputs : TransactionInputSummary[]
    // recieve state hook to set the selected transaction input visibile to the parent componet
    setTxInputSelected : React.Dispatch<React.SetStateAction<string | undefined>>
}



const TransactionInTable = (props: TransactionInTableProps) => {

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
        props.setTxInputSelected(txId);
    }

    const isSelected = (txInput : TransactionInputSummary) => txInput.from === selected;

    const createTableRows = (txInputs : TransactionInputSummary[]) => {
        let count = 0;
        return txInputs
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((txInput: TransactionInputSummary) => {
                let txNum = page*rowsPerPage+(++count);
                return (
                    <TableRow 
                        hover
                        onClick={(e) => handleClickTransaction(e, txInput.from)}
                        key={txInput.from}
                        selected={isSelected(txInput)}>
                        <TableCell align="center" style={{color:"white"}}>Transaction {txNum}: {shortenTxId(txInput.from)} </TableCell>
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
                            <TableCell colSpan={2} align="center">In</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>from</TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {createTableRows(props.txInputs)}
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


export default TransactionInTable;