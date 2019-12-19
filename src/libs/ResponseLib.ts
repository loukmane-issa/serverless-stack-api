import {APIGatewayProxyResult} from "aws-lambda";

export class ResponseLib {
    public static success(body: any) {
        return ResponseLib.buildResponse(200, body);
    }

    public static failure(body: any) {
        return ResponseLib.buildResponse(500, body);
    }

    private static buildResponse(statusCode: number, body: any): APIGatewayProxyResult {
        return {
            statusCode,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": true
            },
            body: JSON.stringify(body)
        }
    }
}
