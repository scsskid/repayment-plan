import type { LoanerType } from '@/lib/RepaymentPlan';
import { numberToLocaleString } from '@/lib/helpers';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function RepaymentPlanTable({ data }: { data: LoanerType }) {
  if (!data || !data.repaymentEntries) return null;

  const rows = data.repaymentEntries;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tilgungsplan Tabelle">
        <TableHead>
          <TableRow>
            <TableCell>P ({data.periodType})</TableCell>
            <TableCell align="right">Annuität</TableCell>
            <TableCell align="right">Zinsanteil</TableCell>
            <TableCell align="right">Tilgungsanteil</TableCell>
            <TableCell align="right">Restschuld</TableCell>
            <TableCell align="right">Restschuld (Nach Periode)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(
            ({
              p,
              remainingLoanAmount,
              annuity,
              interest,
              repayment,
              remainingLoanAmountAfterPeriod
            }) => (
              <TableRow
                key={p}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {p}
                </TableCell>
                <TableCell align="right">
                  {numberToLocaleString(annuity)}
                </TableCell>
                <TableCell align="right">
                  {numberToLocaleString(interest)}
                </TableCell>
                <TableCell align="right">
                  {numberToLocaleString(repayment)}
                </TableCell>
                <TableCell align="right">
                  {numberToLocaleString(remainingLoanAmount)}
                </TableCell>
                <TableCell align="right">
                  {numberToLocaleString(remainingLoanAmountAfterPeriod)}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
