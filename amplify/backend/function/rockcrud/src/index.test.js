import {handler} from './index';

jest.mock('uuid', () => {
  return {
    __esModule: true,
    v4: jest.fn().mockReturnValue('123'),
  };
});

jest.mock('aws-sdk', () => {
  return {
    __esModule: true,
    DynamoDB: {
      DocumentClient: () => ({
        scan: () => ({
          promise: jest.fn().mockResolvedValue({Items: [{id: '1'}]}),
        }),
        put: () => ({
          promise: jest.fn().mockResolvedValue({}),
        }),
        update: () => ({
          promise: jest.fn().mockResolvedValue({}),
        }),
        delete: () => ({
          promise: jest.fn().mockResolvedValue({}),
        }),
      }),
    },
  };
});

const defaultExpected = {
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
};

describe('Testing lambda crud', () => {
  it('Should list records', async () => {
    const response = await handler({httpMethod: 'GET'});

    expect(response).toEqual({
      ...defaultExpected,
      body: JSON.stringify([{id: '1'}]),
    });
  });

  it('Should create record', async () => {
    const response = await handler({
      httpMethod: 'POST',
      body: JSON.stringify({name: 'Test', price: 20}),
    });

    expect(response).toEqual({
      ...defaultExpected,
      body: JSON.stringify({message: 'Pedra criada com sucesso.'}),
    });
  });

  it('Should put record', async () => {
    const response = await handler({
      httpMethod: 'PUT',
      body: JSON.stringify({id: '123', name: 'Test 2', price: 25}),
    });

    expect(response).toEqual({
      ...defaultExpected,
      body: JSON.stringify({message: 'Pedra atualizada com sucesso.'}),
    });
  });

  it('Should delete record', async () => {
    const response = await handler({
      httpMethod: 'DELETE',
      queryStringParameters: JSON.stringify({id: '123'}),
    });

    expect(response).toEqual({
      ...defaultExpected,
      body: JSON.stringify({message: 'Pedra removida com sucesso.'}),
    });
  });
});
