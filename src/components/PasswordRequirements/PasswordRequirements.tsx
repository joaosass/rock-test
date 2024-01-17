import React from 'react';
import {FieldValues, Path, UseFormWatch} from 'react-hook-form';
import {Icon, Text, useTheme} from 'react-native-paper';
import {View} from 'react-native';

import usePasswordRequirement from './usePasswordRequirements';
import styles from './styles';

interface PasswordRequirementsProps<T extends FieldValues> {
  watch?: UseFormWatch<T>;
}

function PasswordRequirements<T extends FieldValues>({
  watch,
}: PasswordRequirementsProps<T>): React.JSX.Element {
  const passwordWatched = watch ? watch('password' as Path<T>) : '';
  const passwordRepWatched = watch ? watch('passwordRep' as Path<T>) : '';

  const {
    hasEqualPasswords,
    hasLength,
    hasLetter,
    hasNumber,
    hasSpecialCharacter,
  } = usePasswordRequirement(passwordWatched, passwordRepWatched);
  const {
    colors: {error, primary},
  } = useTheme();

  return (
    <View style={styles.container}>
      <View testID={`requirement-${hasLetter}`} style={styles.row}>
        {hasLetter ? (
          <Icon color={primary} size={15} source="check-circle" />
        ) : (
          <Icon color={error} size={15} source="alert-circle" />
        )}
        <Text>Ao menos uma letra</Text>
      </View>
      <View testID={`requirement-${hasNumber}`} style={styles.row}>
        {hasNumber ? (
          <Icon color={primary} size={15} source="check-circle" />
        ) : (
          <Icon color={error} size={15} source="alert-circle" />
        )}
        <Text>Ao menos um número</Text>
      </View>
      <View testID={`requirement-${hasSpecialCharacter}`} style={styles.row}>
        {hasSpecialCharacter ? (
          <Icon color={primary} size={15} source="check-circle" />
        ) : (
          <Icon color={error} size={15} source="alert-circle" />
        )}
        <Text>Ao menos um caractere especial</Text>
      </View>
      <View testID={`requirement-${hasLength}`} style={styles.row}>
        {hasLength ? (
          <Icon color={primary} size={15} source="check-circle" />
        ) : (
          <Icon color={error} size={15} source="alert-circle" />
        )}
        <Text>Ter no minímo 8 caracteres</Text>
      </View>
      <View testID={`requirement-${hasEqualPasswords}`} style={styles.row}>
        {hasEqualPasswords ? (
          <Icon color={primary} size={15} source="chec-circle" />
        ) : (
          <Icon color={error} size={15} source="alert-circle" />
        )}
        <Text>As senhas precisam ser iguais</Text>
      </View>
    </View>
  );
}

export default PasswordRequirements;
