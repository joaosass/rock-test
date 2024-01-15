import React from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {IconButton, Text, TextInput} from 'react-native-paper';

import Button from '../../components/Button';
import styles from '../../styles';
import {
  convertCurrencyStringToNumber,
  convertNumberToCurrencyString,
} from '../../utils/currency';

import useForm from './useForm';

function Form(): React.JSX.Element {
  const {control, handleBack, handleSubmit, isEditing, isLoading, isValid} =
    useForm();

  return (
    <SafeAreaView style={styles.fullScreen}>
      <ScrollView contentContainerStyle={[styles.fullScreen]}>
        <IconButton icon="arrow-left" onPress={handleBack} />
        <View style={[styles.container, styles.fullScreen]}>
          <Text variant="headlineMedium" style={styles.title}>
            {isEditing ? 'Edite' : 'Crie'} sua pedra
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
              name="price"
              render={({field: {onChange, ...field}}) => (
                <TextInput
                  mode="outlined"
                  label="Preço"
                  onChangeText={(text: string) =>
                    onChange(
                      convertNumberToCurrencyString(
                        convertCurrencyStringToNumber(text),
                      ),
                    )
                  }
                  {...field}
                />
              )}
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
