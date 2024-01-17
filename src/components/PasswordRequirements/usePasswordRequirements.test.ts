import {renderHook} from '@testing-library/react-native';

import usePasswordRequirements from './usePasswordRequirements';

const renderHookPasswordRequirements = ({password = '', passwordRep = ''}) => {
  const {
    result: {
      current: {
        hasEqualPasswords,
        hasLength,
        hasLetter,
        hasNumber,
        hasSpecialCharacter,
        hasUpperCaseLetter,
      },
    },
  } = renderHook(() => usePasswordRequirements(password, passwordRep));
  return {
    hasEqualPasswords,
    hasLength,
    hasLetter,
    hasNumber,
    hasSpecialCharacter,
    hasUpperCaseLetter,
  };
};

describe('Testing hook usePasswordRequirements', () => {
  it.each([
    [
      'Test123$',
      'Test123$',
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: true,
        hasUpperCaseLetter: true,
      },
    ],
    [
      'Test123$',
      'Test123',
      {
        hasEqualPasswords: false,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: true,
        hasUpperCaseLetter: true,
      },
    ],
    [
      'Test1234',
      'Test12',
      {
        hasEqualPasswords: false,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: true,
      },
    ],
    [
      'Test123',
      'Test12',
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: true,
      },
    ],
    [
      'Test',
      'Test12',
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: true,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: true,
      },
    ],
    [
      'test',
      'test12',
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: true,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      '',
      '',
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
  ])(
    'Should test password (%p, %p)',
    (password, passwordRep, expectedValidations) => {
      const validations = renderHookPasswordRequirements({
        password,
        passwordRep,
      });

      expect(validations).toEqual(expectedValidations);
    },
  );
});
