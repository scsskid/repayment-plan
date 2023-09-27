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
  touched: boolean;
  hasError: boolean;
  errorMessage: string;
};

export type FormState = {
  loanAmount: FormStateItem & { value: string };
  interestRate: FormStateItem & { value: string };
  initialRepaymentRate: FormStateItem & { value: string };
  periodType: FormStateItem & { value: PeriodType };
  fixedInterest: FormStateItem & { value: boolean };
  fixedInterestDuration: FormStateItem & { value: string };
  fixedInterestFollowingInterestRate: FormStateItem & { value: string };
  isFormValid: boolean;
};
