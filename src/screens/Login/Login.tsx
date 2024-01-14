import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

import {RootStackParamList} from '../../App';
import styles from '../../styles';

import useLogin from './useLogin';
import {Controller} from 'react-hook-form';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginProps): React.JSX.Element {
  const {control, handleSubmit} = useLogin();

  return (
    <SafeAreaView style={[styles.container, styles.fullScreen]}>
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
        <Button mode="contained" onPress={handleSubmit}>
          <Text>Entrar</Text>
        </Button>
        <Button onPress={() => navigation.navigate('CreateUser')}>
          Criar conta
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default Login;
