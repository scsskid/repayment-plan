'use client';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Button, TextField, FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import type { RepaymentPlanConstructor } from '@/lib/RepaymentPlan';
// import { action } from '@/actions/formAction';
import {
  onInputChange,
  onFocusOut,
  validateInput,
  UPDATE_FORM
} from '@/lib/formUtils';
import { useState } from 'react';

// type Props = {};
export default function Form({ formState: state, dispatch }) {
  const [showError, setShowError] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault(); //prevents the form from submitting

    let isFormValid = true;

    for (const name in state) {
      const item = state[name];
      const { value } = item;
      const { hasError, errorMessage } = validateInput(name, value);
      if (hasError) {
        isFormValid = false;
      }
      if (name) {
        dispatch({
          type: UPDATE_FORM,
          data: {
            name,
            value,
            hasError,
            errorMessage,
            touched: true,
            isFormValid
          }
        });
      }
    }
    if (!isFormValid) {
      setShowError(true);
    } else {
      //Logic to submit the form to backend
    }

    // Hide the error message after 5 seconds
    setTimeout(() => {
      setShowError(false);
    }, 5000);
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
      <Stack spacing={2}>
        <div className="form-element">
          <FormLabel htmlFor="loanAmount">Loan Amount</FormLabel>
          <TextField
            name="loanAmount"
            onChange={(e) => {
              onInputChange('loanAmount', e.target.value, dispatch, state);
            }}
            onBlur={(e) => {
              onFocusOut('loanAmount', e.target.value, dispatch, state);
            }}
            required
            value={state.loanAmount.value}
            size="small"
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
          {state.loanAmount.touched && state.loanAmount.hasError && (
            <div className="error">{state.loanAmount.errorMessage}</div>
          )}
        </div>

        <div className="form-element">
          <FormLabel htmlFor="interestRate">Interest Rate</FormLabel>
          <TextField
            name="interestRate"
            onChange={(e) => {
              onInputChange('interestRate', e.target.value, dispatch, state);
            }}
            required
            value={state.interestRate.value}
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
            onChange={(e) => {
              onInputChange(
                'initialRepaymentRate',
                e.target.value,
                dispatch,
                state
              );
            }}
            size="small"
            required
            value={state.initialRepaymentRate.value}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </div>

        <div className="form-element">
          <FormControl>
            <FormLabel id="period-type-radio-buttons-group-label">
              Rückzahlungsperiode
            </FormLabel>
            <RadioGroup
              aria-labelledby="Select Period Type"
              value={state.periodType.value}
              name="periodType"
              onChange={(e) => {
                onInputChange('periodType', e.target.value, dispatch, state);
              }}
            >
              <FormControlLabel
                value="monthly"
                control={<Radio required={true} />}
                label="Monatlich"
              />
              <FormControlLabel
                value="annual"
                control={<Radio required={true} />}
                label="Jährlich"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="form-element">
          <Box sx={{ pt: 4 }} className="form-element">
            <Button type="submit" variant="contained">
              Plan erstellen
            </Button>
          </Box>
          {showError && !state.isFormValid && (
            <div className="form_error">
              Please fill all the fields correctly
            </div>
          )}
        </div>
      </Stack>
    </form>
  );
}
