export const convertCurrencyStringToNumber = (currency: string) =>
  Number(currency.replace(/\D/g, '')) / 100;

export const convertNumberToCurrencyString = (number: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(Number(number.toFixed(2)));
