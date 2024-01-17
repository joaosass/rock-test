import {renderHook} from '@testing-library/react-native';

import useTextInput from './useTextInput';

const renderHookTextInput = () => {
  const {
    result: {
      current: {handleCurrency, handleType},
    },
  } = renderHook(() => useTextInput());
  return {
    handleCurrency,
    handleType,
  };
};

describe('Testing hook useTextInput', () => {
  it('Should call handleCurrency', () => {
    const {handleCurrency} = renderHookTextInput();
    const response = handleCurrency('4');

    expect(response).toBe('R$ 0,04');
  });

  it.each([
    [
      'email',
      {
        autoComplete: 'email',
        inputMode: 'email',
        autoCapitalize: 'none',
      },
    ],
    [
      'password',
      {
        secureTextEntry: true,
      },
    ],
    ['', {}],
  ])('Should call handleType (%p)', (type, expected) => {
    const {handleType} = renderHookTextInput();
    const response = handleType(type);

    expect(response).toEqual(expected);
  });
});
