import { revalidatePath } from 'next/cache';
import store from '../app/storeObject';
import RepaymentPlan from '@/lib/RepaymentPlan';

import { Button, TextField, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

type Props = {};
export default function Form({}: Props) {
  const action = async (formData: FormData) => {
    'use server';
    console.log('action', formData);

    const loanAmount = Number(formData.get('loanAmount'));
    const interestRate = Number(formData.get('interestRate'));
    const initialRepaymentRate = Number(formData.get('initialRepaymentRate'));

    console.log('formData', formData);
    console.log({ loanAmount, interestRate, initialRepaymentRate });

    if (!loanAmount || !interestRate || !initialRepaymentRate) {
      throw new Error('Missing required form data');
    }

    store.data = new RepaymentPlan({
      loanAmount,
      interestRate,
      initialRepaymentRate
    });
    revalidatePath('/');
  };

  return (
    <form action={action}>
      <Stack spacing={2}>
        <div className="form-element">
          <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
          <TextField
            name="loanAmount"
            required
            defaultValue={250000}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </div>

        <div className="form-element">
          <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
          <TextField
            name="interestRate"
            required
            defaultValue={4}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            size="small"
          />
        </div>

        <div className="form-element">
          <FormLabel htmlFor="initialRepaymentRate">
            Initial Repayment Rate
          </FormLabel>
          <TextField
            name="initialRepaymentRate"
            size="small"
            required
            defaultValue={3}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </div>

        <div className="form-element">
          <Box sx={{ pt: 4 }} className="form-element">
            <Button type="submit" variant="contained">
              Plan erstellen
            </Button>
          </Box>
        </div>
      </Stack>
    </form>
  );
}
