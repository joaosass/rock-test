import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getCurrentUser, signIn} from 'aws-amplify/auth';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';

import {RootStackParamList} from '../../App';

import schema from './loginSchema';
import type {SCHEMA_TYPE} from './loginSchema';

const useLogin = () => {
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
  }, []);

  const handleLoggedUser = () => navigation.navigate('Home');

  const handleAutoLogin = async () => {
    try {
      const {username} = await getCurrentUser();

      if (username) {
        handleLoggedUser();
      }
    } catch (error) {}
  };

  const handleLogin = async ({email, password}: SCHEMA_TYPE) => {
    const {isSignedIn} = await signIn({username: email, password});
    console.log(isSignedIn);

    if (isSignedIn) {
      handleLoggedUser();
    }
  };

  return {control, errors, handleSubmit: handleSubmit(handleLogin)};
};

export default useLogin;
