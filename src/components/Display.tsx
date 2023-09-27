import RepaymentPlan from '@/lib/RepaymentPlan';
import type { FormState } from '@/types/common';
import RepaymentPlanTable from './RepaymentPlanTable';

// Todo: Types

type Props = {
  formState: FormState;
};

export default function Display({ formState }: Props) {
  const { loanAmount, interestRate, initialRepaymentRate, periodType } =
    formState;
  const isFormValidSimple =
    loanAmount.value !== '0' &&
    interestRate.value !== '0' &&
    initialRepaymentRate.value !== '0' &&
    loanAmount.value !== '' &&
    interestRate.value !== '' &&
    initialRepaymentRate.value !== '';

  console.log('formState', formState);

  if (!isFormValidSimple) {
    return (
      <>
        <p>NOT VALID</p>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </>
    );
  }

  const data = new RepaymentPlan({
    loanAmount: Number(loanAmount.value),
    interestRate: Number(interestRate.value),
    initialRepaymentRate: Number(initialRepaymentRate.value),
    periodType: periodType.value
  });

  console.log('data', data);

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <RepaymentPlanTable data={data} />
    </div>
  );
}
