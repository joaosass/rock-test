import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {signUp} from 'aws-amplify/auth';
import {useForm} from 'react-hook-form';

import useStore from '../../store';
import {RootStackParamList} from '../../types';

import schema from './userSchema';
import type {SCHEMA_TYPE} from './userSchema';

const useCreateUser = () => {
  const {setUser} = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleCreateUser = async ({email, name, password}: SCHEMA_TYPE) => {
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
      navigation.navigate('ConfirmationCode');
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return {control, errors, handleSubmit: handleSubmit(handleCreateUser)};
};

export default useCreateUser;
