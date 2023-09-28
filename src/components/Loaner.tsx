'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useReducer, useState } from 'react';
import { UPDATE_FORM } from '@/lib/formUtils';
import Display from './Display';
import Form from './Form';

import type { DispatchAction, FormState } from '@/types/common';

const commonProps = {
  touched: false,
  hasError: false,
  errorMessage: ''
};

const initialState = {
  loanAmount: { ...commonProps, value: '' },
  interestRate: { ...commonProps, value: '' },
  initialRepaymentRate: { ...commonProps, value: '' },
  periodType: { value: 'monthly' },
  fixedInterest: { ...commonProps, value: false },
  fixedInterestDuration: { ...commonProps, value: '1' },
  fixedInterestFollowingInterestRate: { ...commonProps, value: '5' },
  startDate: { ...commonProps, value: new Date() },
  isFormValid: false
} as FormState;

export default function Loaner() {
  // Todo: useRecuder should not be initialized until the form is submitted
  const [formState, dispatch] = useReducer(formReducer, initialState) as [
    FormState,
    React.Dispatch<DispatchAction>
  ];
  const [formSubmitted, setFormSubmitted] = useState(false);

  const startDate = formState.startDate.value;
  const periodType = formState.periodType.value;

  if (periodType === 'annual') {
    startDate.setMonth(0);
  }

  startDate.setHours(0, 0, 0, 0);
  startDate.setDate(1);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
      <div>
        <Form
          formState={formState}
          dispatch={dispatch}
          setFormSubmitted={setFormSubmitted}
          formSubmitted={formSubmitted}
        />
        {formSubmitted && formState.isFormValid && (
          <Display formState={formState} />
        )}
      </div>
    </LocalizationProvider>
  );
}

const formReducer = (state: FormState, action: DispatchAction) => {
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, errorMessage, touched, isFormValid } =
        action.data;
      return {
        ...state,
        // @ts-ignore
        [name]: { ...state[name], value, hasError, errorMessage, touched },
        isFormValid
      };
    default:
      return state;
  }
};
