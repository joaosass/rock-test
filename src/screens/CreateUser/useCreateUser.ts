import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signUp} from 'aws-amplify/auth';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import useStore from '../../store';
import {RootStackParamList} from '../../types';

import schema from './userSchema';
import type {SCHEMA_TYPE} from './userSchema';

const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {setSnackbar, setUser} = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleCreateUser = async ({email, name, password}: SCHEMA_TYPE) => {
    setIsLoading(true);
    try {
      await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
          },
          autoSignIn: true,
        },
      });
      setUser(email, name);
      setIsLoading(false);
      navigation.navigate('ConfirmationCode');
    } catch (error) {
      setSnackbar({
        isVisible: true,
        message: 'Erro ao criar usuário',
        type: 'error',
      });
      setIsLoading(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    isValid,
    handleSubmit: handleSubmit(handleCreateUser),
  };
};

export default useCreateUser;
