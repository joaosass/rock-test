import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';

import Button from './Button';

const renderButton = ({
  isDisable = false,
  isLoading = false,
  onPress = jest.fn(),
}) => {
  render(
    <Button
      isDisabled={isDisable}
      isLoading={isLoading}
      onPress={onPress}
      text="Text to render"
    />,
  );
};

const getButtonElement = () => screen.getByRole('button');

describe('Testing component Button', () => {
  it('Should render text', () => {
    renderButton({});

    const button = screen.getByText('Text to render');

    expect(button).toBeOnTheScreen();
  });

  it('Should call onPress when tapped', () => {
    const onPress = jest.fn();
    renderButton({onPress});

    const button = getButtonElement();
    fireEvent.press(button);

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Should show loader', () => {
    renderButton({isLoading: true});

    const loading = screen.getByTestId('button-loading');

    expect(loading).toBeOnTheScreen();
  });

  it.each([
    [true, false],
    [true, true],
    [false, true],
  ])(
    'Shouldn`t call onPress when tapped (isDisable: %p, isLoading: %p)',
    (isDisable, isLoading) => {
      const onPress = jest.fn();
      renderButton({onPress, isDisable, isLoading});

      const button = getButtonElement();
      fireEvent.press(button);

      expect(onPress).toHaveBeenCalledTimes(0);
    },
  );
});
