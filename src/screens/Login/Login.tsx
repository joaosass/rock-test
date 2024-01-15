import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Button as ButtonPaper, Text, TextInput} from 'react-native-paper';

import styles from '../../styles';
import {RootStackParamList} from '../../types';

import useLogin from './useLogin';
import {Controller} from 'react-hook-form';
import Button from '../../components/Button';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginProps): React.JSX.Element {
  const {control, isLoading, isValid, handleSubmit} = useLogin();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView contentContainerStyle={[styles.container, styles.fullScreen]}>
        <View>
          <Text variant="displaySmall" style={styles.title}>
            Olá,
          </Text>
          <Text variant="headlineSmall">Bem-vindo(a) ao Ton</Text>
        </View>
        <View style={styles.inputsContainer}>
          <Controller
            control={control}
            name="email"
            render={({field: {onChange, ...field}}) => (
              <TextInput
                mode="outlined"
                label="E-mail"
                autoComplete="email"
                inputMode="email"
                autoCapitalize="none"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({field: {onChange, ...field}}) => (
              <TextInput
                secureTextEntry
                mode="outlined"
                label="Senha"
                onChangeText={onChange}
                {...field}
              />
            )}
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
