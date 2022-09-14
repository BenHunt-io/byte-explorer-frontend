import { Table, TableRow, TableCell, TableHead, TableContainer, TableBody, Paper, TablePagination } from "@mui/material";

const TransactionOutTable = (props: any) => {

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
                        <TableRow>
                            <TableCell>a25...123</TableCell>
                            <TableCell>100 sats</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>hj2...asg</TableCell>
                            <TableCell>15.5k sats</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>gjd...16h</TableCell>
                            <TableCell>6.5m sats</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={3}
                rowsPerPage={3}
                page={0}
            />
        </Paper>
    )

}


export default TransactionOutTable;