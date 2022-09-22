import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, createTheme } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SpeedIcon from '@mui/icons-material/Speed';
import AddIcon from '@mui/icons-material/Add';


// TxId's are too long, so we need to wrap the text content
const tableStyle = {
    "& .MuiTableCell-body": {
        wordBreak: "break-all",
        // width: "300px",
    }
}

type TransactionHeaderModel = {
    version: number,
    previousBlockHeaderHash: string,
    merkleRootHash: string,
    time: Date,
    nBits: string, // difficulty settings
    nonce: number
}

type TransactionHeaderTableProps = {
    txHeader : TransactionHeaderModel | undefined
}


const TransactionHeaderTable = (props: TransactionHeaderTableProps) => {

        return (<TableContainer component={Paper}>
            <Table sx={tableStyle} aria-label="simple table">

                <TableHead>
                    <TableRow>
                        <TableCell colSpan={3}>Header</TableCell>
                    </TableRow>
                </TableHead>

                {/* Need to evaluate if this is the right way to apply styling!! */}
                <TableBody>
                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><EditIcon/></TableCell>
                        <TableCell>Version</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.version : ""}</TableCell>
                    </TableRow>

                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><FingerprintIcon/></TableCell>
                        <TableCell>Previous Block Header Hash</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.previousBlockHeaderHash : ""}</TableCell>
                    </TableRow>

                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><FingerprintIcon/></TableCell>
                        <TableCell>Merkle Root Hash</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.merkleRootHash : ""}</TableCell>
                    </TableRow>

                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><AccessTimeIcon/></TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.time.toString() : ""}</TableCell>
                    </TableRow>

                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><SpeedIcon/></TableCell>
                        <TableCell>NBits</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.nBits : ""}</TableCell>
                    </TableRow>
                    <TableRow>
                        {/* <TableCell align="center"><Check/></TableCell> */}
                        <TableCell align="center"><AddIcon/></TableCell>
                        <TableCell>Nonce</TableCell>
                        <TableCell>{props.txHeader ? props.txHeader.nonce : ""}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        );
    }


export type  {TransactionHeaderModel};
export {TransactionHeaderTable};