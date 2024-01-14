import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';

import styles from '../../styles';
import {RootStackParamList} from '../../types';

import useConfirmationCode from './useConfirmationCode';

type ConfirmationCodeProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmationCode'
>;

function ConfirmationCode({
  navigation,
}: ConfirmationCodeProps): React.JSX.Element {
  const {control, handleSubmit} = useConfirmationCode();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <IconButton icon="arrow-left" onPress={() => navigation.pop()} />
      <View style={[styles.container, styles.fullScreen]}>
        <Text variant="headlineMedium" style={styles.title}>
          Confirme seu email
        </Text>
        <Text>Digite abaixo o código de confirmação em seu email.</Text>
        <View style={styles.inputsContainer}>
          <Controller
            control={control}
            name="code"
            render={({field: {onChange, ...field}}) => (
              <TextInput
                mode="outlined"
                label="Código de confirmação"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Criar conta
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default ConfirmationCode;
