import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDbLib } from '../libs/DynamoDbLib';
import { ResponseLib } from '../libs/ResponseLib';

export const main: APIGatewayProxyHandler = async (event, _context) => {
  const params = {
    TableName: process.env.NOTES_TABLE_NAME,
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };
  try {
    const result = await DynamoDbLib.call('query', params);
    console.log(`Found ${result.Items.length} items`);
    return ResponseLib.success(result.Items);
  } catch (e) {
    console.log('There was an unknown error', e);
    return ResponseLib.failure({ status: false, error: 'Unknown error' });
  }
};
