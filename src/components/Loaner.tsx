'use client';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/de';
import { useReducer } from 'react';
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
  loanAmount: { ...commonProps, value: '250000' },
  interestRate: { ...commonProps, value: '2' },
  initialRepaymentRate: { ...commonProps, value: '3' },
  periodType: { value: 'annual' },
  fixedInterest: { ...commonProps, value: false },
  fixedInterestDuration: { ...commonProps, value: '1' },
  fixedInterestFollowingInterestRate: { ...commonProps, value: '0' },
  startDate: { ...commonProps, value: new Date() },
  isFormValid: false
} as FormState;

const formReducer = (state: FormState, action: DispatchAction) => {
  // console.log('action', action);
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

export default function Loaner() {
  const [formState, dispatch] = useReducer(formReducer, initialState) as [
    FormState,
    React.Dispatch<DispatchAction>
  ];

  console.log('--- formState', formState);

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
        <Form formState={formState} dispatch={dispatch} />
        <Display formState={formState} />
      </div>
    </LocalizationProvider>
  );
}
