import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signIn, fetchAuthSession} from 'aws-amplify/auth';
import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';

import {RootStackParamList} from '../../types';

import schema from './loginSchema';
import type {SCHEMA_TYPE} from './loginSchema';
import useStore from '../../store';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {setToken} = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors, isValid},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  useEffect(() => {
    setIsLoading(true);
    handleAutoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoggedUser = (token: string) => {
    setToken(token);
    navigation.navigate('Home');
  };

  const handleAuthToken = async () => {
    try {
      const {tokens} = await fetchAuthSession();

      return tokens?.idToken?.toString();
    } catch (error) {
      return '';
    }
  };

  const handleAutoLogin = async () => {
    try {
      const token = await handleAuthToken();

      if (token) {
        return handleLoggedUser(token);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const handleLogin = async ({email, password}: SCHEMA_TYPE) => {
    setIsLoading(true);
    try {
      const {isSignedIn} = await signIn({username: email, password});

      if (isSignedIn) {
        setIsLoading(false);
        handleAutoLogin();
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  return {
    control,
    errors,
    isLoading,
    isValid,
    handleSubmit: handleSubmit(handleLogin),
  };
};

export default useLogin;
