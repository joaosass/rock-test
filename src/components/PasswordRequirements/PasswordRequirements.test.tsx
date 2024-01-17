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
}) => {
  jest.spyOn(usePasswordRequirements, 'default').mockImplementation(() => ({
    hasEqualPasswords,
    hasLength,
    hasLetter,
    hasNumber,
    hasSpecialCharacter,
  }));

  render(<PasswordRequirements />);
};

describe('Testing component PasswordRequirements', () => {
  it.each([
    [
      5,
      0,
      {
        hasEqualPasswords: false,
        hasLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
      },
    ],
    [
      4,
      1,
      {
        hasEqualPasswords: true,
        hasLength: false,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
      },
    ],
    [
      3,
      2,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: false,
        hasNumber: false,
        hasSpecialCharacter: false,
      },
    ],
    [
      2,
      3,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: false,
        hasSpecialCharacter: false,
      },
    ],
    [
      1,
      4,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: false,
      },
    ],
    [
      0,
      5,
      {
        hasEqualPasswords: true,
        hasLength: true,
        hasLetter: true,
        hasNumber: true,
        hasSpecialCharacter: true,
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
