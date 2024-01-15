import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

import Button from '../../components/Button';
import TextInput from '../../components/TextInput';
import styles from '../../styles';

import {SCHEMA_TYPE} from './formSchema';
import useForm from './useForm';

function Form(): React.JSX.Element {
  const {
    control,
    errors,
    handleBack,
    handleSubmit,
    isEditing,
    isLoading,
    isValid,
  } = useForm();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView contentContainerStyle={[styles.fullScreen]}>
        <IconButton icon="arrow-left" onPress={handleBack} />
        <View style={[styles.container, styles.fullScreen]}>
          <Text variant="headlineMedium" style={styles.title}>
            {isEditing ? 'Edite' : 'Crie'} sua pedra
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
              label="Preço"
              name="price"
              errorMessage={errors.price?.message}
              type="currency"
            />
          </View>
          <Button
            isDisabled={!isValid}
            isLoading={isLoading}
            onPress={handleSubmit}
            text={isEditing ? 'Editar' : 'Criar'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Form;
