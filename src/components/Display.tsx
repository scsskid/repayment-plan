import type { FormState } from '@/types/common';
import RepaymentPlanTable from './RepaymentPlanTable';
import useRepaymentPlan from '@/hooks.ts/useRepaymentPlan';

type Props = {
  formState: FormState;
};

export default function Display({ formState }: Props) {
  const { repaymentPlan, isFormValidSimple } = useRepaymentPlan(formState);

  if (!isFormValidSimple) {
    return (
      <>
        <p>NOT VALID</p>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </>
    );
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <RepaymentPlanTable data={repaymentPlan} />
    </div>
  );
}
