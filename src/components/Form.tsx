'use client';

// React & non Mui Libs
import { FormEvent, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

// MUI
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import {
  Button,
  TextField,
  FormLabel,
  Checkbox,
  Slider,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Form Utils
import {
  onInputChange,
  onFocusOut,
  validateInput,
  UPDATE_FORM
} from '@/lib/formUtils';
import { DispatchAction, FormState } from '@/types/common';

type Props = {
  formState: FormState;
  dispatch: React.Dispatch<DispatchAction>;
};

export default function Form({ formState: state, dispatch }: Props) {
  const [showError, setShowError] = useState(false);

  const formSubmitHandler = (e: FormEvent) => {
    e.preventDefault(); //prevents the form from submitting

    let isFormValid = true;

    for (const name in state) {
      // @ts-ignore
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
            // @ts-ignore
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
      {/* <pre>{JSON.stringify(state, null, 2)}</pre> */}
      <Stack spacing={2}>
        <div className="form-element">
          <FormControl
            sx={{ width: '20ch' }}
            variant="outlined"
            size="small"
            required={true}
          >
            <InputLabel htmlFor="loanAmount">Darlehensbetrag</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                onInputChange('loanAmount', e.target.value, dispatch, state);
              }}
              id="loanAmount"
              name="loanAmount"
              type={'text'}
              endAdornment={<InputAdornment position="end">€</InputAdornment>}
              label="Darlehensbetrag"
              value={state.loanAmount.value}
            />
          </FormControl>

          {state.loanAmount.touched && state.loanAmount.hasError && (
            <div className="error">{state.loanAmount.errorMessage}</div>
          )}
        </div>

        <div className="form-element">
          <FormControl
            sx={{ width: '20ch' }}
            variant="outlined"
            size="small"
            required={true}
          >
            <InputLabel htmlFor="interestRate">Sollzinssatz</InputLabel>
            <OutlinedInput
              onChange={(e) => {
                onInputChange('interestRate', e.target.value, dispatch, state);
              }}
              id="interestRate"
              name="interestRate"
              type={'text'}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Sollzinssatz"
              value={state.interestRate.value}
            />
          </FormControl>
        </div>

        <div className="form-element">
          <FormControl
            sx={{ width: '20ch' }}
            variant="outlined"
            size="small"
            required={true}
          >
            <InputLabel htmlFor="initialRepaymentRate">
              Rückzahlungssatz
            </InputLabel>
            <OutlinedInput
              onChange={(e) => {
                onInputChange(
                  'initialRepaymentRate',
                  e.target.value,
                  dispatch,
                  state
                );
              }}
              id="initialRepaymentRate"
              name="initialRepaymentRate"
              type={'text'}
              endAdornment={<InputAdornment position="end">%</InputAdornment>}
              label="Rückzahlungssatz"
              value={state.initialRepaymentRate.value}
            />
          </FormControl>
        </div>

        <div className="form-element">
          <DatePicker
            label="Start Datum"
            value={dayjs(state.startDate.value)}
            onChange={(date: Dayjs | null) => {
              if (!date) return;

              const dateArg = new Date(date.toDate());
              onInputChange('startDate', dateArg, dispatch, state);
            }}
            sx={{ width: '20ch' }}
            slotProps={{ textField: { size: 'small' } }}
            views={
              state.periodType.value === 'annual' ? ['year'] : ['month', 'year']
            }
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
          <FormLabel htmlFor="fixedInterest">Zinsbindung festlegen</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name="fixedInterest"
                onChange={(e) => {
                  onInputChange(
                    'fixedInterest',
                    e.target.checked,
                    dispatch,
                    state
                  );
                }}
              />
            }
            label="Zinsbindung festlegen"
          />
        </div>

        {state.fixedInterest.value && (
          <>
            <div className="form-element">
              <FormLabel htmlFor="fixedInterestDuration">
                Zinsbindungsdauer (Jahre)
              </FormLabel>
              <Slider
                name="fixedInterestDuration"
                id="fixedInterestDuration"
                onChange={(e: Event) => {
                  if (!e.target) return;

                  onInputChange(
                    'fixedInterestDuration',
                    // @ts-ignore
                    e.target.value,
                    dispatch,
                    state
                  );
                }}
                aria-label="Zinsbindungsdauer (Jahre)"
                defaultValue={1}
                step={1}
                min={1}
                max={30}
                valueLabelDisplay="on"
              />
            </div>

            <div className="form-element">
              <FormLabel htmlFor="initialRepaymentRate">
                Anschlusszinssatz
              </FormLabel>
              <TextField
                name="fixedInterestFollowingInterestRate"
                onChange={(e) => {
                  onInputChange(
                    'fixedInterestFollowingInterestRate',
                    e.target.value,
                    dispatch,
                    state
                  );
                }}
                size="small"
                required
                value={state.fixedInterestFollowingInterestRate.value}
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
              />
            </div>
          </>
        )}

        <div className="form-element">
          <Box sx={{ pt: 4 }} className="form-element">
            <Button type="submit" variant="contained">
              Berechnen
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
