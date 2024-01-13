import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';

import styles from '../../styles';
import {RootStackParamList} from '../../App';

type CreateUserProps = NativeStackScreenProps<RootStackParamList, 'CreateUser'>;

function CreateUser({navigation}: CreateUserProps): React.JSX.Element {
  return (
    <SafeAreaView style={styles.fullScreen}>
      <IconButton icon="arrow-left" onPress={() => navigation.pop()} />
      <View style={[styles.container, styles.fullScreen]}>
        <Text variant="headlineMedium" style={styles.title}>
          Crie sua conta
        </Text>
        <View style={styles.inputsContainer}>
          <TextInput mode="outlined" label="Nome" />
          <TextInput
            mode="outlined"
            label="E-mail"
            autoComplete="email"
            inputMode="email"
          />
          <TextInput secureTextEntry mode="outlined" label="Senha" />
          <TextInput secureTextEntry mode="outlined" label="Repetir senha" />
        </View>
        <Button mode="contained">Criar conta</Button>
      </View>
    </SafeAreaView>
  );
}

export default CreateUser;
