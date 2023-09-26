import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { LoanerType } from '@/lib/RepaymentPlan';

// Todo: Types

type Props = {
  data: LoanerType;
};
export default function Display({ data }: Props) {
  // console.log('data', data);

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <BasicTable data={data} />
    </div>
  );
}

function BasicTable({ data }: Props) {
  if (!data || !data.repaymentEntries) return null;

  const rows = data.repaymentEntries;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
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

function numberToLocaleString(number: number) {
  // const string = number.toString();
  return number.toLocaleString('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}
