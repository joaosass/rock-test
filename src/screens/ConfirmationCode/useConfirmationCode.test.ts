import {renderHook} from '@testing-library/react-native';
import * as navigation from '@react-navigation/native';
import * as auth from 'aws-amplify/auth';
import * as form from 'react-hook-form';
import * as react from 'react';

import * as store from '../../store';

import useConfirmationCode from './useConfirmationCode';

jest.mock('aws-amplify/auth', () => {
  return {
    __esModule: true,
    confirmSignUp: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-navigation/native'),
  };
});

const renderHookConfirmationCode = () => {
  const navigate = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    username: 'test@test.com',
    token: 'token',
  }));

  jest.spyOn(navigation, 'useNavigation').mockImplementation(() => ({
    navigate,
  }));

  /* @ts-ignore */
  jest.spyOn(form, 'useForm').mockImplementation(() => ({
    handleSubmit: callback => () => callback({code: '12345'}),
    formState: {errors: {}},
    control: jest.fn(),
  }));

  jest.spyOn(react, 'useState').mockImplementation(() => [false, jest.fn()]);

  const confirmSignUp = jest
    .spyOn(auth, 'confirmSignUp')
    /* @ts-ignore */
    .mockResolvedValueOnce({});

  const {
    result: {
      current: {handleSubmit},
    },
  } = renderHook(() => useConfirmationCode());

  return {
    navigate,
    confirmSignUp,
    handleSubmit,
  };
};

describe('Testing hook useConfirmationCode', () => {
  it('Should call handleSubmit', async () => {
    const {confirmSignUp, handleSubmit, navigate} =
      renderHookConfirmationCode();

    await handleSubmit();

    expect(confirmSignUp).toHaveBeenCalledWith({
      username: 'test@test.com',
      confirmationCode: '12345',
    });
    expect(navigate).toHaveBeenCalledWith('Login');
  });
});
