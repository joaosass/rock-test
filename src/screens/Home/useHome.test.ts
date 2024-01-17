import {renderHook} from '@testing-library/react-native';
import * as api from 'aws-amplify/api';
import * as react from 'react';

import {apiName, path} from '../../constants';
import * as store from '../../store';

import useHome from './useHome';

jest.mock('aws-amplify/api', () => {
  return {
    __esModule: true,
    get: jest.fn(),
  };
});

const renderHookHome = () => {
  jest.spyOn(store, 'default').mockImplementation(() => ({
    token: 'token',
    refetchListKey: '',
  }));

  jest.spyOn(react, 'useState').mockImplementation(() => [false, jest.fn()]);

  const get = jest
    .spyOn(api, 'get')
    /* @ts-ignore */
    .mockImplementation(() => ({
      response: jest.fn().mockResolvedValue({
        body: {json: jest.fn().mockResolvedValue([{id: '1'}])},
      }),
      cancel: jest.fn(),
    }));

  renderHook(() => useHome());

  return {
    get,
  };
};

describe('Testing hook useHome', () => {
  it('Should call get', async () => {
    const {get} = renderHookHome();

    expect(get).toHaveBeenCalledWith({
      apiName,
      path,
      options: {
        headers: {
          Authorization: 'token',
        },
      },
    });
  });
});
