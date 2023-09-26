'use client';

import { useReducer } from 'react';
import { UPDATE_FORM } from '@/lib/formUtils';
import { PeriodType } from '@/lib/RepaymentPlan';
import Display from './Display';
import Form from './Form';

const commonProps = {
  value: 0,
  touched: false,
  hasError: false,
  errorMessage: ''
};

const initialState = {
  loanAmount: { ...commonProps },
  interestRate: { ...commonProps },
  initialRepaymentRate: { ...commonProps },
  periodType: { ...commonProps, value: 'monthly' as PeriodType }
};

const formReducer = (state, action) => {
  console.log('action', action);
  switch (action.type) {
    case UPDATE_FORM:
      const { name, value, hasError, errorMessage, touched, isFormValid } =
        action.data;
      return {
        ...state,
        [name]: { ...state[name], value, hasError, errorMessage, touched },
        isFormValid
      };
    default:
      return state;
  }
};

type Props = {};
export default function Loaner({}: Props) {
  const [formState, dispatch] = useReducer(formReducer, initialState);

  return (
    <div>
      <Form formState={formState} dispatch={dispatch} />
      <Display formState={formState} />
    </div>
  );
}
