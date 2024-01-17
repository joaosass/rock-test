import {renderHook} from '@testing-library/react-native';

import * as store from '../../store';

import useSnackbar from './useSnackbar';

const renderHookSnackbar = (type = 'success') => {
  const setSnackbar = jest.fn();

  jest.spyOn(store, 'default').mockImplementation(() => ({
    snackbar: {
      type,
    },
    setSnackbar,
  }));

  const {
    result: {
      current: {handleClose, typeButtonStyle, typeStyle},
    },
  } = renderHook(() => useSnackbar());
  return {
    handleClose,
    setSnackbar,
    typeButtonStyle,
    typeStyle,
  };
};

describe('Testing hook useSnackbar', () => {
  it('Should call handleClose', () => {
    const {handleClose, setSnackbar} = renderHookSnackbar();
    handleClose();

    expect(setSnackbar).toHaveBeenCalledWith({isVisible: false});
  });

  it.each([
    ['success', '#212121', {backgroundColor: '#1EC677'}],
    ['error', '#fff', {backgroundColor: 'rgba(179, 38, 30, 1)'}],
  ])('Should call handleClose', (type, expectedButtonStyle, expectedStyle) => {
    const {typeButtonStyle, typeStyle} = renderHookSnackbar(type);

    expect(typeButtonStyle).toBe(expectedButtonStyle);
    expect(typeStyle).toEqual(expectedStyle);
  });
});
