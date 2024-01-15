import React from 'react';
import {ScrollView, View} from 'react-native';
import {Controller} from 'react-hook-form';
import {
  ActivityIndicator,
  Button,
  IconButton,
  Text,
  TextInput,
} from 'react-native-paper';

import styles from '../../styles';
import useForm from './useForm';
import {
  convertCurrencyStringToNumber,
  convertNumberToCurrencyString,
} from '../../utils/currency';

function Form(): React.JSX.Element {
  const {control, handleBack, handleSubmit, isEditing, isLoading, isValid} =
    useForm();

  return (
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
          disabled={!isValid || isLoading}
          mode="contained"
          onPress={handleSubmit}>
          {isLoading ? (
            <ActivityIndicator size="small" />
          ) : isEditing ? (
            'Editar'
          ) : (
            'Criar'
          )}
        </Button>
      </View>
    </ScrollView>
  );
}

export default Form;
