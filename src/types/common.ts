import { PeriodType } from '@/lib/RepaymentPlan';

export type DispatchActionDataValue = string | boolean | Date | PeriodType;

export type DispatchAction = {
  type: string;
  data: {
    name: keyof FormState;
    value: DispatchActionDataValue;
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
  startDate: FormStateItem & { value: Date };
  isFormValid: boolean;
};
