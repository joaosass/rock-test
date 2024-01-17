import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button as ButtonPaper, Text} from 'react-native-paper';

import styles from '../../styles';
import {RootStackParamList} from '../../types';

import useLogin from './useLogin';
import Button from '../../components/Button';
import TextInput from '../../components/TextInput';

import {SCHEMA_TYPE} from './loginSchema';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginProps): React.JSX.Element {
  const {control, errors, isLoading, isValid, handleSubmit} = useLogin();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView contentContainerStyle={[styles.container, styles.fullScreen]}>
        <View>
          <Text variant="displaySmall" style={styles.title}>
            Olá,
          </Text>
          <Text variant="headlineSmall">Bem-vindo(a) ao Rockapp</Text>
        </View>
        <View style={styles.inputsContainer}>
          <TextInput<SCHEMA_TYPE>
            control={control}
            label="E-mail"
            name="email"
            errorMessage={errors.email?.message}
            type="email"
          />
          <TextInput<SCHEMA_TYPE>
            control={control}
            label="Senha"
            name="password"
            errorMessage={errors.password?.message}
            type="password"
          />
        </View>
        <View style={styles.inputsContainer}>
          <Button
            isDisabled={!isValid}
            isLoading={isLoading}
            onPress={handleSubmit}
            text="Entrar"
          />
          <ButtonPaper onPress={() => navigation.navigate('CreateUser')}>
            Criar conta
          </ButtonPaper>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Login;
