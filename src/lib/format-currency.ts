export const formatCurrency = (
  value: number,
  locale: string = "id-ID",
  currency: string = "IDR"
): string => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};
