import {
  LETTER_REGEX,
  NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
  UPPERCASE_LETTER_REGEX,
} from './constants';

const usePasswordRequirement = (
  password: string = '',
  passwordRep: string = '',
) => {
  return {
    hasNumber: NUMBER_REGEX.test(password),
    hasLetter: LETTER_REGEX.test(password),
    hasSpecialCharacter: SPECIAL_CHARACTER_REGEX.test(password),
    hasLength: password.length >= 8,
    hasEqualPasswords: Boolean(password) && password === passwordRep,
    hasUpperCaseLetter: UPPERCASE_LETTER_REGEX.test(password),
  };
};

export default usePasswordRequirement;
