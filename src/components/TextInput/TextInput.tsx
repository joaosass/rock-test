import React from 'react';
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  UseFormWatch,
} from 'react-hook-form';
import {View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';

import PasswordRequirements from '../PasswordRequirements';

import useTextInput from './useTextInput';

interface TextInputProps<T extends FieldValues> {
  control: Control<T>;
  errorMessage?: string;
  hasPasswordRequirements?: boolean;
  label: string;
  name: FieldPath<T>;
  type?: string;
  watch?: UseFormWatch<T>;
}

function TextInputComponent<T extends FieldValues>({
  control,
  errorMessage,
  hasPasswordRequirements,
  label,
  name,
  type,
  watch,
}: TextInputProps<T>): React.JSX.Element {
  const {handleCurrency, handleType} = useTextInput();

  return (
    <View>
      {hasPasswordRequirements ? (
        <PasswordRequirements<T> watch={watch} />
      ) : null}
      <Controller
        control={control}
        name={name}
        render={({field: {onChange, ...field}}) => (
          <TextInput
            mode="outlined"
            label={label}
            {...handleType(type)}
            onChangeText={
              type === 'currency'
                ? text => onChange(handleCurrency(text))
                : onChange
            }
            error={Boolean(errorMessage)}
            {...field}
          />
        )}
      />
      {errorMessage ? (
        <HelperText type="error">{errorMessage}</HelperText>
      ) : null}
    </View>
  );
}

export default TextInputComponent;
