/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require('aws-sdk');
const {v4: uuidv4} = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const TableName = 'rocks-dev';

const list = async () => {
  const result = await dynamoDB.scan({TableName}).promise();
  return result.Items;
};

const create = async item => {
  const params = {
    TableName,
    Item: {...item, id: uuidv4()},
  };

  try {
    await dynamoDB.put(params).promise();
    return {message: 'Pedra criada com sucesso.'};
  } catch (error) {
    return {error: 'Erro ao criar pedra!'};
  }
};

const update = async ({id, name, price}) => {
  const params = {
    TableName,
    Key: {id},
    UpdateExpression: 'SET #a = :x, #b = :y',
    ExpressionAttributeNames: {
      '#a': 'name',
      '#b': 'price',
    },
    ExpressionAttributeValues: {
      ':x': name,
      ':y': price,
    },
  };

  try {
    await dynamoDB.update(params).promise();
    return {message: 'Pedra atualizada com sucesso.'};
  } catch (error) {
    return {error: 'Erro ao atualizar pedra!'};
  }
};

const remove = async Key => {
  const params = {
    TableName,
    Key,
  };

  try {
    await dynamoDB.delete(params).promise();
    return {message: 'Pedra removida com sucesso.'};
  } catch (error) {
    return {error: 'Erro ao remover pedra!'};
  }
};

exports.handler = async ({
  body,
  httpMethod,
  queryStringParameters,
  ...event
}) => {
  let response;
  switch (httpMethod) {
    case 'GET':
      response = await list();
      break;
    case 'POST':
      response = await create(JSON.parse(body));
      break;
    case 'PUT':
      response = await update(JSON.parse(body));
      break;
    case 'DELETE':
      response = await remove(queryStringParameters);
      break;
    default:
      response = 'Operação não suportada';
  }

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    body: JSON.stringify(response),
  };
};
