import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper } from "@mui/material";
import ColoredMoney from "../../common/ColoredMoney";

export type TransactionOutputDetail = {
    value: number
    scriptPubKey: string
    scriptPubKeySize: number
}

type TransactionOutputDetailTableProps = {
    txOutDetail : TransactionOutputDetail
}

const TransactionOutDetailTable = (props: TransactionOutputDetailTableProps) => {

    const {txOutDetail} = props;

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} align="center">Output Detail</TableCell>
                        </TableRow>
                        <TableRow >
                            <TableCell>Value</TableCell>
                            <TableCell>Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell><ColoredMoney value={txOutDetail.value}/></TableCell>
                            <TableCell>value</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txOutDetail.scriptPubKeySize}</TableCell>
                            <TableCell>scriptPubKeySize</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>{txOutDetail.scriptPubKey}</TableCell>
                            <TableCell>scriptPubKey</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionOutDetailTable;