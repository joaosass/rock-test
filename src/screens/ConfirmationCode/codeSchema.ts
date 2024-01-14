import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    code: yup.string().required('O campo "Código" é obrigatório!'),
  })
  .required();

export type SCHEMA_TYPE = {
  code: string;
};

export default schema;
