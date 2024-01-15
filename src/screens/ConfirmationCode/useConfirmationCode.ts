import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {confirmSignUp} from 'aws-amplify/auth';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import useStore from '../../store';
import {RootStackParamList} from '../../types';

import schema from './codeSchema';
import type {SCHEMA_TYPE} from './codeSchema';

const useConfirmationCode = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    user: {email},
  } = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleConfirmationCode = async ({code}: SCHEMA_TYPE) => {
    setIsLoading(true);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      setIsLoading(false);
      navigation.navigate('Login');
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    isValid,
    handleSubmit: handleSubmit(handleConfirmationCode),
  };
};

export default useConfirmationCode;
