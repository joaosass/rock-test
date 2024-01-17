import React from 'react';
import {render, screen} from '@testing-library/react-native';

import * as usePasswordRequirements from './usePasswordRequirements';

import PasswordRequirements from './PasswordRequirements';

jest.mock('./usePasswordRequirements', () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

const renderPasswordRequirements = ({
  hasEqualPasswords = false,
  hasLength = false,
  hasLetter = false,
  hasNumber = false,
  hasSpecialCharacter = false,
  hasUpperCaseLetter = false,
}) => {
  jest.spyOn(usePasswordRequirements, 'default').mockImplementation(() => ({
    hasEqualPasswords,
    hasLength,
    hasLetter,
    hasNumber,
    hasSpecialCharacter,
    hasUpperCaseLetter,
  }));

  render(<PasswordRequirements />);
};

describe('Testing component PasswordRequirements', () => {
  it.each([
    [
      6,
      0,
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      5,
      1,
      {
        hasEqualPasswords: true,
        hasLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      4,
      2,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      3,
      3,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: false,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      2,
      4,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: false,
        hasUpperCaseLetter: false,
      },
    ],
    [
      1,
      5,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: true,
        hasUpperCaseLetter: false,
      },
    ],
    [
      0,
      6,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: true,
        hasUpperCaseLetter: true,
      },
    ],
  ])(
    'Should requirent with %p errors and %p success',
    (expectedErrors, expectedSuccess, validations) => {
      renderPasswordRequirements(validations);

      const errorsCount = screen.queryAllByTestId('requirement-false').length;
      const successCount = screen.queryAllByTestId('requirement-true').length;

      expect(errorsCount).toBe(expectedErrors);
      expect(successCount).toBe(expectedSuccess);
    },
  );
});
