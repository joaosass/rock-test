import {yupResolver} from '@hookform/resolvers/yup';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {confirmSignUp} from 'aws-amplify/auth';
import {useForm} from 'react-hook-form';

import {RootStackParamList} from '../../App';
import useStore from '../../store';

import schema from './codeSchema';
import type {SCHEMA_TYPE} from './codeSchema';

const useConfirmationCode = () => {
  const {
    user: {email},
  } = useStore();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleConfirmationCode = async ({code}: SCHEMA_TYPE) => {
    console.log(code);
    console.log(email);
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      navigation.navigate('Login');
    } catch (error) {
      console.log('error signing up:', error);
    }
  };

  return {control, errors, handleSubmit: handleSubmit(handleConfirmationCode)};
};

export default useConfirmationCode;
