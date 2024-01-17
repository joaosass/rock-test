import React from 'react';
import {fireEvent, render, screen} from '@testing-library/react-native';
import {PaperProvider} from 'react-native-paper';

import * as useModal from './useModal';

import Modal from './Modal';

jest.mock('./useModal', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const renderModal = (isModalVisible = true) => {
  const handleClose = jest.fn();
  const handleDeleteRock = jest.fn();

  jest.spyOn(useModal, 'default').mockImplementation(() => ({
    isLoading: false,
    isModalVisible,
    handleClose,
    handleDeleteRock,
  }));

  render(
    <PaperProvider>
      <Modal />
    </PaperProvider>,
  );
  return {handleClose, handleDeleteRock};
};

describe('Testing component Modal', () => {
  it('Should render modal', () => {
    renderModal();

    const modal = screen.getByText('Deseja mesmo excluir esta pedra?');

    expect(modal).toBeOnTheScreen();
  });

  it('Shouldn`t render modal', () => {
    renderModal(false);

    const modal = screen.queryByText('Deseja mesmo excluir esta pedra?');

    expect(modal).toBeNull();
  });

  it('Should call handleClose when tap cancel button', () => {
    const {handleClose} = renderModal();

    const cancelButton = screen.getByText('Cancelar');
    fireEvent.press(cancelButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('Should call handleDeleteRock when tap delete button', () => {
    const {handleDeleteRock} = renderModal();

    const cancelButton = screen.getByText('Excluir');
    fireEvent.press(cancelButton);

    expect(handleDeleteRock).toHaveBeenCalledTimes(1);
  });
});
