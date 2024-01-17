import {renderHook} from '@testing-library/react-native';
import * as navigation from '@react-navigation/native';
import * as auth from 'aws-amplify/auth';
import * as form from 'react-hook-form';
import * as react from 'react';

import * as store from '../../store';

import useCreateUser from './useCreateUser';

jest.mock('aws-amplify/auth', () => {
  return {
    __esModule: true,
    signUp: jest.fn(),
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
  const setUsername = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    setUsername,
  }));

  jest.spyOn(navigation, 'useNavigation').mockImplementation(() => ({
    navigate,
  }));

  /* @ts-ignore */
  jest.spyOn(form, 'useForm').mockImplementation(() => ({
    handleSubmit: callback => () =>
      callback({email: 'test@test.com', name: 'Test', password: 'Test123$'}),
    formState: {errors: {}},
    control: jest.fn(),
  }));

  jest.spyOn(react, 'useState').mockImplementation(() => [false, jest.fn()]);

  const signUp = jest
    .spyOn(auth, 'signUp')
    /* @ts-ignore */
    .mockResolvedValueOnce({});

  const {
    result: {
      current: {handleSubmit},
    },
  } = renderHook(() => useCreateUser());

  return {
    navigate,
    signUp,
    handleSubmit,
  };
};

describe('Testing hook useCreateUser', () => {
  it('Should call handleSubmit', async () => {
    const {signUp, handleSubmit, navigate} = renderHookConfirmationCode();

    await handleSubmit();

    expect(signUp).toHaveBeenCalledWith({
      username: 'test@test.com',
      password: 'Test123$',
      options: {
        userAttributes: {
          email: 'test@test.com',
          name: 'Test',
        },
        autoSignIn: true,
      },
    });
    expect(navigate).toHaveBeenCalledWith('ConfirmationCode');
  });
});
