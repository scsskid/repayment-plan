export type PeriodType = 'annual' | 'monthly';

type Constructor = {
  loanAmount: number;
  interestRate: number;
  initialRepaymentRate: number;
  periodType?: PeriodType;
};

type LoanerEntry = {
  p: number;
  annuity: number;
  interest: number;
  repayment: number;
  remainingLoanAmount: number;
  remainingLoanAmountAfterPeriod: number;
};

export type LoanerType = Constructor & {
  repaymentEntries: LoanerEntry[];
};

export default class Loaner {
  public periodType: PeriodType;
  public initialRepaymentRate: number;
  public interestRate: number;
  public loanAmount: number;
  public repaymentEntries: LoanerEntry[];

  constructor({
    initialRepaymentRate,
    interestRate,
    loanAmount,
    periodType = 'annual'
  }: Constructor) {
    this.periodType = periodType;
    this.loanAmount = loanAmount;
    this.initialRepaymentRate = initialRepaymentRate;
    this.interestRate = interestRate;
    this.repaymentEntries = [];

    this.buildPlanEntries();
  }

  private buildPlanEntries() {
    const { interestRate, initialRepaymentRate, repaymentEntries } = this;
    let { loanAmount: remainingLoanAmount } = this;

    let p = 0; // rename to periodIndex
    const periodDivider = this.periodType === 'monthly' ? 12 : 1;

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
      repaymentEntries.push({
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
