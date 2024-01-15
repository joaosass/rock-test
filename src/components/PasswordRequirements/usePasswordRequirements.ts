import {LETTER_REGEX, NUMBER_REGEX, SPECIAL_CHARACTER_REGEX} from './constants';

const usePasswordRequirement = (
  password: string = '',
  passwordRep: string = '',
) => {
  return {
    hasNumber: NUMBER_REGEX.test(password),
    hasLetter: LETTER_REGEX.test(password),
    hasSpecialCharacter: SPECIAL_CHARACTER_REGEX.test(password),
    hasLength: password.length >= 8,
    hasEqualPasswords: password && password === passwordRep,
  };
};

export default usePasswordRequirement;
