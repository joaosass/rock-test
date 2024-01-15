import {yupResolver} from '@hookform/resolvers/yup';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {post, put} from 'aws-amplify/api';
import {useState} from 'react';
import {useForm as useHookForm} from 'react-hook-form';

import {apiName, path} from '../../constants';
import useStore from '../../store';
import {
  convertCurrencyStringToNumber,
  convertNumberToCurrencyString,
} from '../../utils/currency';
import {RootStackParamList} from '../../types';

import schema from './formSchema';
import type {SCHEMA_TYPE} from './formSchema';

const useForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {editingRock, token, setEditingRock, setRefetchListKey} = useStore();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isEditing = Boolean(editingRock);

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useHookForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      name: editingRock?.name || '',
      price: editingRock?.price
        ? convertNumberToCurrencyString(editingRock.price)
        : '',
    },
  });

  const handleCreateOrUpdateRock = async ({name, price}: SCHEMA_TYPE) => {
    setIsLoading(true);
    const method = isEditing ? put : post;

    try {
      const {response} = method({
        apiName,
        path,
        options: {
          body: {
            id: editingRock?.id || '',
            name,
            price: convertCurrencyStringToNumber(price),
          },
          headers: {
            Authorization: token,
          },
        },
      });

      await response;

      setEditingRock();
      setRefetchListKey();
      setIsLoading(false);
      navigation.navigate('Home');
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setEditingRock();
    navigation.pop();
  };

  return {
    control,
    errors,
    isEditing,
    isLoading,
    isValid,
    handleBack,
    handleSubmit: handleSubmit(handleCreateOrUpdateRock),
  };
};

export default useForm;
