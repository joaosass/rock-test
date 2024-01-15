import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import styles from '../../styles';
import {RootStackParamList} from '../../types';

import useCreateUser from './useCreateUser';
import {SCHEMA_TYPE} from './userSchema';

type CreateUserProps = NativeStackScreenProps<RootStackParamList, 'CreateUser'>;

function CreateUser({navigation}: CreateUserProps): React.JSX.Element {
  const {control, errors, isLoading, isValid, handleSubmit} = useCreateUser();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <IconButton icon="arrow-left" onPress={() => navigation.pop()} />
      <ScrollView contentContainerStyle={[styles.container, styles.fullScreen]}>
        <Text variant="headlineMedium" style={styles.title}>
          Crie sua conta
        </Text>
        <View style={styles.inputsContainer}>
          <TextInput<SCHEMA_TYPE>
            control={control}
            label="Nome"
            name="name"
            errorMessage={errors.name?.message}
          />
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
          <TextInput<SCHEMA_TYPE>
            control={control}
            label="Repetir senha"
            name="passwordRep"
            errorMessage={errors.passwordRep?.message}
            type="password"
          />
        </View>
        <Button
          isDisabled={!isValid}
          isLoading={isLoading}
          onPress={handleSubmit}
          text="Próximo"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

export default CreateUser;
