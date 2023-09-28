import type { LoanerType } from '@/lib/RepaymentPlan';
import { getPeriodDate, numberToLocaleString } from '@/lib/helpers';

// MUI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function RepaymentPlanTable({
  repaymentPlan,
  startDate
}: {
  repaymentPlan: LoanerType;
  startDate: {
    value: Date;
  };
}) {
  if (!repaymentPlan || !repaymentPlan.repaymentEntries) return null;

  const rows = repaymentPlan.repaymentEntries.map((entry, index) => {
    return {
      ...entry,
      periodDate: getPeriodDate(
        startDate.value,
        repaymentPlan.periodType,
        index
      )
    };
  });
  const periodDateOptions: Intl.DateTimeFormatOptions =
    repaymentPlan.periodType === 'annual'
      ? { year: 'numeric' }
      : {
          month: 'short',
          year: 'numeric'
        };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Tilgungsplan Tabelle">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>
              {repaymentPlan.periodType === 'annual' ? 'Jahr' : 'Monat'}
            </TableCell>
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
              periodIndex,
              remainingLoanAmount,
              annuity,
              interest,
              repayment,
              remainingLoanAmountAfterPeriod,
              isFirstPeriodAfterFixedInterest,
              periodDate
            }) => {
              return (
                <TableRow
                  key={periodIndex}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    ...(isFirstPeriodAfterFixedInterest && {
                      'th, td': { borderTop: '2px solid red' }
                    })
                  }}
                >
                  <TableCell component="th" scope="row">
                    {periodIndex}
                  </TableCell>
                  <TableCell>
                    {periodDate.toLocaleDateString('de', periodDateOptions)}

                    <br />
                    {isFirstPeriodAfterFixedInterest &&
                      ' (nach Sollzinsbindung)'}
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
              );
            }
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
