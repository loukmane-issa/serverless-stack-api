import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';
import * as uuid from 'uuid';
import { DynamoDB } from 'aws-sdk';
import { ResponseLib } from '../libs/ResponseLib';
import { DynamoDbLib } from '../libs/DynamoDbLib';

export const main: APIGatewayProxyHandler = async (event, _context) => {
  const data = JSON.parse(event.body);
  const generatedUUID = uuid.v4();
  console.log(`Generated UUID is: ${generatedUUID}`);
  const params: DynamoDB.DocumentClient.PutItemInput = {
    TableName: process.env.NOTES_TABLE_NAME,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v4(),
      content: data.content,
      attachment: data.attachment,
      createdAt: Date.now(),
    }
  };
  try {
    await DynamoDbLib.call('put', params);
    return ResponseLib.success(params.Item);
  } catch (e) {
    return ResponseLib.failure({status: false});
  }
};
