import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper } from "@mui/material";


type TransactionInput = {
    txId : string,
    vOut : number,
    scriptSigSize: number,
    scriptSig: string,
    sequence: string
}

type TransactionInputTableProps = {
    txInput : TransactionInput
}

const TransactionInputsTable = (props: TransactionInputTableProps) => {

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">In</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{props.txInput.txId}</TableCell>
                            <TableCell>Transaction Id</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{props.txInput.vOut}</TableCell>
                            <TableCell>Vout</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{props.txInput.scriptSigSize}</TableCell>
                            <TableCell>scriptSigSize (in bytes)</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{props.txInput.scriptSig}</TableCell>
                            <TableCell>scriptSig</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{props.txInput.sequence}</TableCell>
                            <TableCell>sequence</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionInputsTable;