'use client';

import { useReducer } from 'react';
import { UPDATE_FORM } from '@/lib/formUtils';
import Display from './Display';
import Form from './Form';

import type { DispatchAction, FormState } from '@/types/common';

const commonProps = {
  value: '0',
  touched: false,
  hasError: false,
  errorMessage: ''
};

const initialState = {
  loanAmount: { ...commonProps },
  interestRate: { ...commonProps },
  initialRepaymentRate: { ...commonProps },
  periodType: { value: 'monthly' },
  isFormValid: false
} as FormState;

const formReducer = (state: FormState, action: DispatchAction) => {
  console.log('action', action);
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

type Props = {};
export default function Loaner({}: Props) {
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
