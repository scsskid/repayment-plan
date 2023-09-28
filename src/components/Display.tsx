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
  const periodCount = repaymentPlan.repaymentEntries.length;
  const durationDisplay = () => {
    if (periodType === 'annual') {
      return `${periodCount} Jahre`;
    }

    var years = Math.floor(periodCount / 12);
    var months: number = periodCount % 12;

    return `${years} Jahre ${months} Monate`;
  };

  const { startDate } = formState;

  if (!isFormValidSimple) {
    return (
      <>
        <p style={{ color: 'red' }}>formData ist ungültig.</p>
        <pre>{JSON.stringify(formState, null, 2)}</pre>
      </>
    );
  }

  return (
    <div>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

      <dl>
        <dt>Startdatum: </dt>
        <dd>{startDate.value.toLocaleDateString('de')}</dd>
        <dt>Periode Art: </dt>
        <dd>{repaymentPlan.periodType}</dd>
        <dt>Laufzeit: </dt>

        <dd>{durationDisplay()}</dd>
        {initialAunnuity && (
          <>
            <dt>Annuität: </dt>
            <dd>{numberToLocaleString(initialAunnuity)} €</dd>
          </>
        )}

        {repaymentPlan.loanAmountAfterFixedInterestPeriod && (
          <>
            <dt>Restschuld nach Sollzinsbindung: </dt>
            <dd>
              {numberToLocaleString(
                repaymentPlan.loanAmountAfterFixedInterestPeriod
              )}{' '}
              €
            </dd>
          </>
        )}
      </dl>
      <RepaymentPlanTable repaymentPlan={repaymentPlan} startDate={startDate} />
    </div>
  );
}
