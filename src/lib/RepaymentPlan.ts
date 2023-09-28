export type PeriodType = 'annual' | 'monthly';

export type RepaymentPlanConstructor = {
  loanAmount: number;
  interestRate: number;
  initialRepaymentRate: number;
  periodType: PeriodType;
  fixedInterest?: boolean;
  fixedInterestDuration?: number;
  fixedInterestFollowingInterestRate?: number;
  initialAunnuity?: number;
};

export type LoanerEntry = {
  periodIndex: number;
  annuity: number;
  interest: number;
  repayment: number;
  remainingLoanAmount: number;
  remainingLoanAmountAfterPeriod: number;
  isFirstPeriodAfterFixedInterest?: boolean;
};

export type LoanerType = RepaymentPlanConstructor & {
  repaymentEntries: LoanerEntry[];
};

export default class Loaner {
  public periodType: PeriodType;
  public initialRepaymentRate: number;
  public interestRate: number;
  public loanAmount: number;
  public repaymentEntries: LoanerEntry[];
  public fixedInterest: boolean;
  public fixedInterestDuration?: number;
  public fixedInterestFollowingInterestRate?: number;
  public loanAmountAfterFixedInterestPeriod?: number;
  public initialAunnuity: number;

  constructor({
    initialRepaymentRate,
    interestRate,
    loanAmount,
    periodType = 'annual',
    fixedInterest = false,
    fixedInterestDuration,
    fixedInterestFollowingInterestRate
  }: RepaymentPlanConstructor) {
    this.periodType = periodType;
    this.loanAmount = loanAmount;
    this.initialRepaymentRate = initialRepaymentRate;
    this.interestRate = interestRate;
    this.fixedInterest = fixedInterest;
    this.fixedInterestDuration = fixedInterestDuration;
    this.fixedInterestFollowingInterestRate =
      fixedInterestFollowingInterestRate;
    this.repaymentEntries = [];
    this.loanAmountAfterFixedInterestPeriod = undefined;
    this.initialAunnuity = 0;

    this.buildPlanEntries();
  }

  private buildPlanEntries() {
    const hasValidFixedInterest =
      this.fixedInterest &&
      this.fixedInterestDuration &&
      this.fixedInterestFollowingInterestRate &&
      ((this.fixedInterestFollowingInterestRate > 0) as boolean);
    let { loanAmount: remainingLoanAmount } = this;

    let periodIndex = 0; // rename to periodIndex
    const periodDivider = this.periodType === 'monthly' ? 12 : 1;

    // remainingLoanAmount is always measured at begin of period
    // set repayment to initial value (Year 0)
    const initialRepayment =
      (remainingLoanAmount * this.initialRepaymentRate) / 100 / periodDivider;
    const interest =
      (remainingLoanAmount * this.interestRate) / 100 / periodDivider;
    // set total payment which remains constant in every future period ("annuity")
    let annuity = interest + initialRepayment;
    this.initialAunnuity = annuity;

    while (remainingLoanAmount > 0 && periodIndex < 999) {
      let interest =
        (remainingLoanAmount * this.interestRate) / 100 / periodDivider;

      if (
        this.fixedInterest &&
        this.fixedInterestDuration &&
        periodIndex === this.fixedInterestDuration * periodDivider
      ) {
        this.loanAmountAfterFixedInterestPeriod = remainingLoanAmount;
      }

      let currentPeriodRepayment = annuity - interest;

      // Last repayment should equal remainingLoanAmount
      if (remainingLoanAmount < currentPeriodRepayment) {
        // if remaining loan amount is lt repayment (repayment is calculated from fixed annuity)
        // annuity has to be recalculated and repayment equals remainingLoanAmount
        annuity = remainingLoanAmount + interest;
        currentPeriodRepayment = remainingLoanAmount;
      }

      // push period entry to plan.entries
      this.repaymentEntries.push({
        periodIndex,
        remainingLoanAmount,
        annuity,
        interest,
        repayment: currentPeriodRepayment,
        remainingLoanAmountAfterPeriod:
          remainingLoanAmount - currentPeriodRepayment,
        isFirstPeriodAfterFixedInterest:
          hasValidFixedInterest === true &&
          // @ts-ignore
          periodIndex === this.fixedInterestDuration * periodDivider
      } as LoanerEntry);

      // decrease remainingLoanAmount by payment and increase period index
      remainingLoanAmount -= currentPeriodRepayment;
      periodIndex++;
    }
  }
}
