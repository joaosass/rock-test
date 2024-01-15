import {
  convertCurrencyStringToNumber,
  convertNumberToCurrencyString,
} from '../../utils/currency';

interface UseTextInputResponse {
  autoCapitalize?: 'none';
  autoComplete?: 'email';
  inputMode?: 'email';
  secureTextEntry?: boolean;
}

const useTextInput = () => {
  const handleCurrency = (text: string) =>
    convertNumberToCurrencyString(convertCurrencyStringToNumber(text));

  const handleType = (type?: string): UseTextInputResponse => {
    switch (type) {
      case 'email':
        return {
          autoComplete: 'email',
          inputMode: 'email',
          autoCapitalize: 'none',
        };
      case 'password':
        return {
          secureTextEntry: true,
        };
      default:
        return {};
    }
  };

  return {handleCurrency, handleType};
};

export default useTextInput;
