import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import styles from '../../styles';
import {RootStackParamList} from '../../types';

import {SCHEMA_TYPE} from './codeSchema';
import useConfirmationCode from './useConfirmationCode';

type ConfirmationCodeProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmationCode'
>;

function ConfirmationCode({
  navigation,
}: ConfirmationCodeProps): React.JSX.Element {
  const {control, errors, handleSubmit, isLoading, isValid} =
    useConfirmationCode();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <IconButton icon="arrow-left" onPress={() => navigation.pop()} />
      <ScrollView contentContainerStyle={[styles.container, styles.fullScreen]}>
        <Text variant="headlineMedium" style={styles.title}>
          Confirme seu email
        </Text>
        <Text>Digite abaixo o código de confirmação em seu email.</Text>
        <TextInput<SCHEMA_TYPE>
          control={control}
          label="Código de confirmação"
          name="code"
          errorMessage={errors.code?.message}
        />
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          text="Criar conta"
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default ConfirmationCode;
