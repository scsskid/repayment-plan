import { PeriodType } from '@/lib/RepaymentPlan';

export type DispatchAction = {
  type: string;
  data: {
    name: keyof FormState;
    value: string;
    hasError: boolean;
    errorMessage: string;
    touched: boolean;
    isFormValid: boolean;
  };
};

export type FormStateItem = {
  value: string;
  touched: boolean;
  hasError: boolean;
  errorMessage: string;
};

export type FormState = {
  loanAmount: FormStateItem;
  interestRate: FormStateItem;
  initialRepaymentRate: FormStateItem;
  periodType: { value: PeriodType };
  isFormValid: boolean;
};
