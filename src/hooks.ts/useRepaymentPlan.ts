import type { FormState } from '@/types/common';
import RepaymentPlan from '@/lib/RepaymentPlan';

export default function useRepaymentPlan(formState: FormState) {
  const {
    loanAmount,
    interestRate,
    initialRepaymentRate,
    periodType,
    fixedInterest,
    fixedInterestDuration,
    fixedInterestFollowingInterestRate
  } = formState;

  const isFormValidSimple =
    parseFloat(loanAmount.value) > 0 &&
    parseFloat(interestRate.value) > 0 &&
    parseFloat(initialRepaymentRate.value) > 0 &&
    loanAmount.value !== '' &&
    interestRate.value !== '' &&
    initialRepaymentRate.value !== '';

  const repaymentPlan = new RepaymentPlan({
    loanAmount: Number(loanAmount.value),
    interestRate: Number(interestRate.value),
    initialRepaymentRate: Number(initialRepaymentRate.value),
    periodType: periodType.value,
    fixedInterest: fixedInterest.value,
    fixedInterestDuration: Number(fixedInterestDuration.value),
    fixedInterestFollowingInterestRate: Number(
      fixedInterestFollowingInterestRate.value
    )
  });

  return { repaymentPlan, isFormValidSimple };
}
