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

// TxIds, ScriptSigs, and other data is too long so we need to wrap the content
const tableStyle = {
    "& .MuiTableCell-body": {
        wordBreak: "break-all",
        maxWidth: "350px",
    },
    size: "small"
}

const TransactionOutDetailTable = (props: TransactionOutputDetailTableProps) => {

    const {txOutDetail} = props;

    return (
        <Paper sx={{ width: '100%'}}>
            <TableContainer>
                <Table sx={tableStyle} size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Output Detail</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>value</TableCell>
                            <TableCell><ColoredMoney value={txOutDetail.value}/></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>scriptPubKeySize</TableCell>
                            <TableCell>{txOutDetail.scriptPubKeySize}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>scriptPubKey</TableCell>
                            <TableCell>{txOutDetail.scriptPubKey}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )

}


export default TransactionOutDetailTable;