import { revalidatePath } from 'next/cache';
import store from '../app/storeObject';
import RepaymentPlan from '@/lib/RepaymentPlan';

type Props = {};
export default function Form({}: Props) {
  const action = async (formData: FormData) => {
    'use server';
    console.log('action', formData);

    const loanAmount = Number(formData.get('loanAmount'));
    const interestRate = Number(formData.get('interestRate'));
    const initialRepaymentRate = Number(formData.get('initialRepaymentRate'));

    console.log('formData', formData);
    console.log({ loanAmount, interestRate, initialRepaymentRate });

    if (!loanAmount || !interestRate || !initialRepaymentRate) {
      throw new Error('Missing required form data');
    }

    store.data = new RepaymentPlan({
      loanAmount,
      interestRate,
      initialRepaymentRate
    });
    revalidatePath('/');
  };

  return (
    <form action={action}>
      <div className="form-element">
        <label htmlFor="loanAmount">Loan Amount</label>
        <input type="number" name="loanAmount" defaultValue={250000} required />
      </div>

      <div className="form-element">
        <label htmlFor="interestRate">Interest Rate</label>
        <input type="number" name="interestRate" required defaultValue={4} />
      </div>

      <div className="form-element">
        <label htmlFor="initialRepaymentRate">Initial Repayment Rate</label>
        <input
          type="number"
          name="initialRepaymentRate"
          required
          defaultValue={3}
        />
      </div>

      <input type="submit" value="Submit" />
    </form>
  );
}
