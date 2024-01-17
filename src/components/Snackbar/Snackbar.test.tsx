import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {PaperProvider} from 'react-native-paper';

import * as useSnackbar from './useSnackbar';

import Snackbar from './Snackbar';

jest.mock('./useSnackbar', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const renderSnackbar = (isVisible = true) => {
  const handleClose = jest.fn();

  jest.spyOn(useSnackbar, 'default').mockImplementation(() => ({
    handleClose,
    isVisible,
    message: 'Mensagem de alerta',
    typeButtonStyle: '',
    typeStyle: {backgroundColor: ''},
  }));

  render(
    <PaperProvider>
      <Snackbar />
    </PaperProvider>,
  );
  return {handleClose};
};

describe('Testing component Snackbar', () => {
  it('Should render snackbar', () => {
    renderSnackbar();

    const snackbar = screen.getByText('Mensagem de alerta');

    expect(snackbar).toBeOnTheScreen();
  });

  it('Shouldn`t render modal', () => {
    renderSnackbar(false);

    const snackbar = screen.queryByText('Mensagem de alerta');

    expect(snackbar).toBeNull();
  });

  it('Should call handleClose when tap close button', () => {
    const {handleClose} = renderSnackbar(true);

    const snackbarCloseButton = screen.getByText('Fechar');
    fireEvent.press(snackbarCloseButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
