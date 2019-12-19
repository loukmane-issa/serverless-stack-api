import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDbLib } from '../libs/DynamoDbLib';
import { ResponseLib } from '../libs/ResponseLib';

export const main: APIGatewayProxyHandler = async (event, _context) => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: process.env.NOTES_TABLE_NAME,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null
    },
    ReturnValues: 'ALL_NEW'
  };

  try {
    const response = await DynamoDbLib.call('update', params);
    console.log(`Note with id: ${event.pathParameters.id} has been successfully updated`, response);
    return ResponseLib.success({ status: true });
  } catch (e) {
    console.log('There was an unknown error', e);
    return ResponseLib.failure({ status: false, error: 'Unknown error' });
  }
}
