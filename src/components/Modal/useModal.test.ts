import {act, renderHook} from '@testing-library/react-native';
import * as api from 'aws-amplify/api';

import {apiName, path} from '../../constants';
import * as store from '../../store';

import useModal from './useModal';

jest.mock('aws-amplify/api', () => {
  return {
    __esModule: true,
    del: jest.fn(),
  };
});

const renderHookModal = () => {
  const setEditingRock = jest.fn();
  const setIsModalVisible = jest.fn();
  const setRefetchListKey = jest.fn();
  const setSnackbar = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    editingRock: {
      id: '1',
    },
    token: 'token',
    setEditingRock,
    setIsModalVisible,
    setRefetchListKey,
    setSnackbar,
  }));

  /* @ts-ignore */
  const del = jest.spyOn(api, 'del').mockImplementation(() => ({
    response: jest.fn().mockResolvedValue({body: {}}),
    cancel: jest.fn(),
  }));

  const {
    result: {
      current: {handleClose, handleDeleteRock},
    },
  } = renderHook(() => useModal());
  return {
    handleClose,
    handleDeleteRock,
    setEditingRock,
    setIsModalVisible,
    setRefetchListKey,
    setSnackbar,
    del,
  };
};

describe('Testing hook useModal', () => {
  it('Should call handleClose', () => {
    const {handleClose, setEditingRock, setIsModalVisible} = renderHookModal();
    handleClose();

    expect(setEditingRock).toHaveBeenCalledWith();
    expect(setIsModalVisible).toHaveBeenCalledWith(false);
  });

  it('Should call handleDeleteRock', async () => {
    const {handleDeleteRock, setRefetchListKey, setSnackbar, del} =
      renderHookModal();
    await act(async () => {
      await handleDeleteRock();
    });

    expect(setRefetchListKey).toHaveBeenCalledWith();
    expect(setSnackbar).toHaveBeenCalledWith({
      isVisible: true,
      message: 'Pedra excluída com sucesso',
      type: 'success',
    });
    expect(del).toHaveBeenCalledWith({
      apiName,
      path: `${path}?id=1`,
      options: {
        headers: {
          Authorization: 'token',
        },
      },
    });
  });
});
