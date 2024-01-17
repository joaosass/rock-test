import {
  convertCurrencyStringToNumber,
  convertNumberToCurrencyString,
} from './currency';

describe('Testing currency utils', () => {
  it.each([['R$ 100,00'], ['100,00'], ['100.00']])(
    'Should convert a currency (%p) in a number',
    currencyString => {
      const convertedNumber = convertCurrencyStringToNumber(currencyString);

      expect(convertedNumber).toBe(100);
    },
  );

  it.each([
    [100, 'R$ 100,00'],
    [99.99, 'R$ 99,99'],
  ])(
    'Should convert a number (%p) in a currency string (%p)',
    (number, expected) => {
      const convertedCurrency = convertNumberToCurrencyString(number);

      expect(convertedCurrency).toBe(expected);
    },
  );
});
