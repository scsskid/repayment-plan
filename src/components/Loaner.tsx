'use client';

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
    () => {}
  ];

  return (
    <div>
      <Form formState={formState} dispatch={dispatch} />
      <Display formState={formState} />
    </div>
  );
}
