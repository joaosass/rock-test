import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('O campo "Nome" é obrigatório!'),
    email: yup.string().required('O campo "Email" é obrigatório!'),
    password: yup.string().required('O campo "Senha" é obrigatório!'),
    passwordRep: yup
      .string()
      .required('O campo "Repetir senha" é obrigatório!'),
  })
  .required();

export type SCHEMA_TYPE = {
  name: string;
  email: string;
  password: string;
  passwordRep: string;
};

export default schema;
