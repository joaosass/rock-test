import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';

import {RootStackParamList} from '../../App';
import styles from '../../styles';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginProps): React.JSX.Element {
  return (
    <SafeAreaView style={[styles.container, styles.fullScreen]}>
      <View>
        <Text variant="displaySmall" style={styles.title}>
          Olá,
        </Text>
        <Text variant="headlineSmall">Bem-vindo(a) ao Ton</Text>
      </View>
      <View style={styles.inputsContainer}>
        <TextInput
          mode="outlined"
          label="E-mail"
          autoComplete="email"
          inputMode="email"
        />
        <TextInput secureTextEntry mode="outlined" label="Senha" />
      </View>
      <View style={styles.inputsContainer}>
        <Button mode="contained">
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
