import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    name: yup.string().required('O campo "Nome" é obrigatório!'),
    price: yup.string().required('O campo "Preço" é obrigatório!'),
  })
  .required();

export type SCHEMA_TYPE = {
  name: string;
  price: string;
};

export default schema;
