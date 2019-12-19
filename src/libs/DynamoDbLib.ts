import { DynamoDB } from 'aws-sdk';

export class DynamoDbLib {

  public static call(action: string, params: any) {
    const dynamoDb = new DynamoDB.DocumentClient();
    return dynamoDb[action](params).promise();
  }

}
