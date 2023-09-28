export function numberToLocaleString(number: number) {
  return number.toLocaleString('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}

export function getPeriodDate(
  startDate: Date,
  periodType: 'monthly' | 'annual',
  index: number
) {
  const periodDate = new Date(startDate.getTime());
  const startDateMonth = startDate.getMonth();
  const offset = periodType === 'monthly' ? 1 : 12;

  periodDate.setMonth(startDateMonth + offset * index);

  return periodDate;
}
