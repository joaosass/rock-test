import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup.string().required('O campo "E-mail" é obrigatório!'),
    password: yup.string().required('O campo "Senha" é obrigatório!'),
  })
  .required();

export type SCHEMA_TYPE = {
  email: string;
  password: string;
};

export default schema;
