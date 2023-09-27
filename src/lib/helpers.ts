export function numberToLocaleString(number: number) {
  return number.toLocaleString('de-DE', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2
  });
}
