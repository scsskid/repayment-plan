type Period = 'annual' | 'monthly';

type LoanerProps = {
  loanAmount: number;
  interestRate: number;
  initialRepaymentRate: number;
  period?: Period;
};

type LoanerEntry = {
  p: number;
  annuity: number;
  interest: number;
  repayment: number;
  remainingLoanAmount: number;
  remainingLoanAmountAfterPeriod: number;
};

type Plan = {
  period: Period;
  loanAmount: number;
  entries: LoanerEntry[];
};

export default class Loaner {
  private period: Period;
  private periodDivider: 12 | 1;
  public plan: Plan;
  private initialRepaymentRate: number;
  private interestRate: number;

  constructor({
    initialRepaymentRate,
    interestRate,
    loanAmount,
    period = 'annual'
  }: LoanerProps) {
    this.plan = { period, loanAmount, entries: [] };
    this.initialRepaymentRate = initialRepaymentRate;
    this.interestRate = interestRate;

    this.buildPlanEntries();
  }

  private buildPlanEntries() {
    const { interestRate, initialRepaymentRate, plan } = this;
    let { loanAmount: remainingLoanAmount } = plan;
    let p = 0; // rename to periodIndex
    const periodDivider = this.plan.period === 'monthly' ? 12 : 1;

    // remainingLoanAmount is always measured at begin of period
    // set repayment to initial value (Year 0)
    const initialRepayment =
      (remainingLoanAmount * initialRepaymentRate) / 100 / periodDivider;
    const initialInterest =
      (remainingLoanAmount * interestRate) / 100 / periodDivider;
    // set total payment which remains constant in every future period ("annuity")
    let annuity = initialInterest + initialRepayment;

    while (remainingLoanAmount > 0 && p < 9999) {
      const interest =
        (remainingLoanAmount * interestRate) / 100 / periodDivider;
      let repayment = annuity - interest;

      // Last repayment should equal remainingLoanAmount
      if (remainingLoanAmount < repayment) {
        // if remaining loan amount is lt repayment (repayment is calculated from fixed annuity)
        // annuity has to be recalculated and repayment equals remainingLoanAmount
        annuity = remainingLoanAmount + interest;
        repayment = remainingLoanAmount;
      }

      // push period entry to plan.entries
      plan.entries.push({
        p,
        remainingLoanAmount,
        annuity,
        interest,
        repayment,
        remainingLoanAmountAfterPeriod: remainingLoanAmount - repayment
      } as LoanerEntry);

      // decrease remainingLoanAmount by payment and increase period index
      remainingLoanAmount -= repayment;
      p++;
    }
  }
}
