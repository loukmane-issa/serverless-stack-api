import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { ResponseLib } from '../libs/ResponseLib';
import { DynamoDbLib } from '../libs/DynamoDbLib';

export const main: APIGatewayProxyHandler = async (event, _context) => {
  const noteId = event.pathParameters.id;
  console.log(`Getting note with id: ${noteId}`);
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: process.env.NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId,
    }
  };
  try {
    const result = await DynamoDbLib.call('get', params);
    if (result.Item) {
      return ResponseLib.success(result.Item);
    }
    return ResponseLib.failure({ status: false, error: 'Item not found' });
  } catch (e) {
    return ResponseLib.failure({ status: false, error: 'Unknown error' });
  }
};
