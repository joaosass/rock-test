import React from 'react';
import {
  fireEvent,
  render,
  renderHook,
  screen,
} from '@testing-library/react-native';

import * as useTextInput from './useTextInput';

import TextInput from './TextInput';
import {useForm} from 'react-hook-form';

jest.mock('./useTextInput', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const renderTextInput = ({errorMessage = '', type = ''}) => {
  const handleCurrency = jest.fn();
  const handleType = jest.fn();

  jest.spyOn(useTextInput, 'default').mockImplementation(() => ({
    handleCurrency,
    handleType,
  }));

  const {
    result: {
      current: {control},
    },
  } = renderHook(() => useForm());

  render(
    <TextInput
      errorMessage={errorMessage}
      control={control}
      type={type}
      label="Texto"
      name="Texto"
    />,
  );
  return {handleCurrency, handleType};
};

describe('Testing component TextInput', () => {
  it('Should render typped text', () => {
    renderTextInput({});

    const textInput = screen.getByTestId('text-input');
    fireEvent.changeText(textInput, 'text');

    expect(textInput.props.value).toBe('text');
  });

  it('Should handle currency text', () => {
    const {handleCurrency, handleType} = renderTextInput({type: 'currency'});

    const textInput = screen.getByTestId('text-input');
    fireEvent.changeText(textInput, '123');

    expect(handleCurrency).toHaveBeenCalledWith('123');
    expect(handleType).toHaveBeenCalledWith('currency');
  });

  it('Should show error message', () => {
    renderTextInput({errorMessage: 'Campo obrigatório'});

    const textInputErrorMessage = screen.getByText('Campo obrigatório');

    expect(textInputErrorMessage).toBeOnTheScreen();
  });
});
