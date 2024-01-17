import {act, renderHook} from '@testing-library/react-native';
import * as navigation from '@react-navigation/native';
import * as api from 'aws-amplify/api';
import * as form from 'react-hook-form';
import * as react from 'react';

import * as store from '../../store';

import useForm from './useForm';
import {apiName, path} from '../../constants';

jest.mock('aws-amplify/api', () => {
  return {
    __esModule: true,
    post: jest.fn(),
    put: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-navigation/native'),
  };
});

const renderHookForm = (editingRock?: {id: string}) => {
  const navigate = jest.fn();
  const pop = jest.fn();
  const setEditingRock = jest.fn();
  const setRefetchListKey = jest.fn();
  const setSnackbar = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    editingRock,
    token: 'token',
    setEditingRock,
    setRefetchListKey,
    setSnackbar,
  }));

  jest.spyOn(navigation, 'useNavigation').mockImplementation(() => ({
    navigate,
    pop,
  }));

  /* @ts-ignore */
  jest.spyOn(form, 'useForm').mockImplementation(() => ({
    handleSubmit: callback => async () =>
      await callback({name: 'Test', price: 'R$ 20,00'}),
    formState: {errors: {}},
    control: jest.fn(),
  }));

  jest.spyOn(react, 'useState').mockImplementation(() => [false, jest.fn()]);

  /* @ts-ignore */
  const post = jest.spyOn(api, 'post').mockImplementation(() => ({
    response: jest.fn().mockResolvedValue({body: {}}),
    cancel: jest.fn(),
  }));

  /* @ts-ignore */
  const put = jest.spyOn(api, 'put').mockImplementation(() => ({
    response: jest.fn().mockResolvedValue({body: {}}),
    cancel: jest.fn(),
  }));

  const {
    result: {
      current: {handleBack, handleSubmit},
    },
  } = renderHook(() => useForm());

  return {
    navigate,
    setEditingRock,
    setRefetchListKey,
    setSnackbar,
    pop,
    post,
    put,
    handleBack,
    handleSubmit,
  };
};

describe('Testing hook useForm', () => {
  it('Should call handleSubmit (post)', async () => {
    const {
      post,
      handleSubmit,
      navigate,
      setEditingRock,
      setRefetchListKey,
      setSnackbar,
    } = renderHookForm();

    await act(async () => {
      await handleSubmit();
    });

    expect(post).toHaveBeenCalledWith({
      apiName,
      path,
      options: {
        body: {
          id: '',
          name: 'Test',
          price: 20,
        },
        headers: {
          Authorization: 'token',
        },
      },
    });
    expect(setEditingRock).toHaveBeenCalledWith();
    expect(setRefetchListKey).toHaveBeenCalledWith();
    expect(setSnackbar).toHaveBeenCalledWith({
      isVisible: true,
      message: `Pedra criada com sucesso`,
      type: 'success',
    });
    expect(navigate).toHaveBeenCalledWith('Home');
  });

  it('Should call handleSubmit (put)', async () => {
    const {
      put,
      handleSubmit,
      navigate,
      setEditingRock,
      setRefetchListKey,
      setSnackbar,
    } = renderHookForm({id: '1'});

    await handleSubmit();

    expect(put).toHaveBeenCalledWith({
      apiName,
      path,
      options: {
        body: {
          id: '1',
          name: 'Test',
          price: 20,
        },
        headers: {
          Authorization: 'token',
        },
      },
    });
    expect(setEditingRock).toHaveBeenCalledWith();
    expect(setRefetchListKey).toHaveBeenCalledWith();
    expect(setSnackbar).toHaveBeenCalledWith({
      isVisible: true,
      message: `Pedra editada com sucesso`,
      type: 'success',
    });
    expect(navigate).toHaveBeenCalledWith('Home');
  });

  it('Should call handleBack', async () => {
    const {pop, setEditingRock, handleBack} = renderHookForm();

    handleBack();

    expect(pop).toHaveBeenCalledWith();
    expect(setEditingRock).toHaveBeenCalledWith();
  });
});
