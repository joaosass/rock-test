import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';

import styles from '../../styles';
import {RootStackParamList} from '../../types';

import useCreateUser from './useCreateUser';

type CreateUserProps = NativeStackScreenProps<RootStackParamList, 'CreateUser'>;

function CreateUser({navigation}: CreateUserProps): React.JSX.Element {
  const {control, handleSubmit} = useCreateUser();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <IconButton icon="arrow-left" onPress={() => navigation.pop()} />
      <View style={[styles.container, styles.fullScreen]}>
        <Text variant="headlineMedium" style={styles.title}>
          Crie sua conta
        </Text>
        <View style={styles.inputsContainer}>
          <Controller
            control={control}
            name="name"
            render={({field: {onChange, ...field}}) => (
              <TextInput
                mode="outlined"
                label="Nome"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
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
          <Controller
            control={control}
            name="passwordRep"
            render={({field: {onChange, ...field}}) => (
              <TextInput
                secureTextEntry
                mode="outlined"
                label="Repetir senha"
                onChangeText={onChange}
                {...field}
              />
            )}
          />
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Próximo
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default CreateUser;
