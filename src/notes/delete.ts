import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import { DynamoDB } from 'aws-sdk';
import { ResponseLib } from '../libs/ResponseLib';
import { DynamoDbLib } from '../libs/DynamoDbLib';

export const main: APIGatewayProxyHandler = async (event, _context) => {
  const noteId = event.pathParameters.id;
  console.log(`Deleting note with id: ${noteId}`);
  const params: DynamoDB.DocumentClient.GetItemInput = {
    TableName: process.env.NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId,
    }
  };
  try {
    await DynamoDbLib.call('delete', params);
    return ResponseLib.success({ status: true });
  } catch (e) {
    return ResponseLib.failure({ status: false, error: 'Unknown error' });
  }
};
