import type { FormState } from '@/types/common';
import RepaymentPlanTable from './RepaymentPlanTable';
import useRepaymentPlan from '@/hooks.ts/useRepaymentPlan';
import { numberToLocaleString } from '@/lib/helpers';

type Props = {
  formState: FormState;
};

export default function Display({ formState }: Props) {
  const { repaymentPlan, isFormValidSimple } = useRepaymentPlan(formState);
  const { initialAunnuity, periodType } = repaymentPlan;

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

      <dl>
        <dt>Laufzeit: </dt>
        <dd>{repaymentPlan.periodType}</dd>
        {initialAunnuity && (
          <>
            <dt>Annuität: </dt>
            <dd>{numberToLocaleString(initialAunnuity)}</dd>
          </>
        )}

        {repaymentPlan.loanAmountAfterFixedInterestPeriod && (
          <>
            <dt>Restschuld nach Sollzinsbindung: </dt>
            <dd>
              {numberToLocaleString(
                repaymentPlan.loanAmountAfterFixedInterestPeriod
              )}
            </dd>
          </>
        )}
      </dl>
      <RepaymentPlanTable data={repaymentPlan} />
    </div>
  );
}
