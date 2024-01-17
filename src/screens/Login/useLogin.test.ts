import {act, renderHook} from '@testing-library/react-native';
import * as navigation from '@react-navigation/native';
import * as auth from 'aws-amplify/auth';
import * as form from 'react-hook-form';
import * as react from 'react';

import * as store from '../../store';

import useLogin from './useLogin';

jest.mock('aws-amplify/auth', () => {
  return {
    __esModule: true,
    signIn: jest.fn(),
    fetchAuthSession: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  return {
    __esModule: true,
    ...jest.requireActual('@react-navigation/native'),
  };
});

const renderHookLogin = () => {
  const navigate = jest.fn();
  const setToken = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    setToken,
  }));

  jest.spyOn(navigation, 'useNavigation').mockImplementation(() => ({
    navigate,
  }));

  /* @ts-ignore */
  jest.spyOn(form, 'useForm').mockImplementation(() => ({
    handleSubmit: callback => async () =>
      await callback({email: 'test@test.com', password: 'Test123$'}),
    formState: {errors: {}},
    control: jest.fn(),
  }));

  jest.spyOn(react, 'useState').mockImplementation(() => [false, jest.fn()]);

  const signIn = jest
    .spyOn(auth, 'signIn')
    /* @ts-ignore */
    .mockResolvedValue({isSignedIn: true});

  const fetchAuthSession = jest
    .spyOn(auth, 'fetchAuthSession')
    /* @ts-ignore */
    .mockResolvedValue({tokens: {idToken: 'token'}});

  const {
    result: {
      current: {handleSubmit},
    },
  } = renderHook(() => useLogin());

  return {
    navigate,
    setToken,
    signIn,
    fetchAuthSession,
    handleSubmit,
  };
};

describe('Testing hook useLogin', () => {
  it('Should call handleSubmit', async () => {
    const {handleSubmit, fetchAuthSession, signIn, navigate, setToken} =
      renderHookLogin();

    await act(async () => {
      await handleSubmit();
    });

    expect(signIn).toHaveBeenCalledWith({
      username: 'test@test.com',
      password: 'Test123$',
    });
    expect(fetchAuthSession).toHaveBeenCalledWith();
    expect(setToken).toHaveBeenCalledWith('token');
    expect(navigate).toHaveBeenCalledWith('Home');
  });
});
