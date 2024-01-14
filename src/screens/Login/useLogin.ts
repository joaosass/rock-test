import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signIn, fetchAuthSession} from 'aws-amplify/auth';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {RootStackParamList} from '../../App';

import schema from './loginSchema';
import type {SCHEMA_TYPE} from './loginSchema';
import useStore from '../../store';

const useLogin = () => {
  const {setToken} = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
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
        handleLoggedUser(token);
      }
    } catch (error) {}
  };

  const handleLogin = async ({email, password}: SCHEMA_TYPE) => {
    const {isSignedIn} = await signIn({username: email, password});

    if (isSignedIn) {
      handleAutoLogin();
    }
  };

  return {control, errors, handleSubmit: handleSubmit(handleLogin)};
};

export default useLogin;
