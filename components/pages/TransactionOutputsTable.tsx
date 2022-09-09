import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper } from "@mui/material";

const TransactionOutputsTable = (props: any) => {

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">Out</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>10000 sats</TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>12</TableCell>
                            <TableCell>scriptPubKeySize</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>32</TableCell>
                            <TableCell>scriptPubKey</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionOutputsTable;