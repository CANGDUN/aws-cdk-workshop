import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apigw from '@aws-cdk/aws-apigateway';

export class AwsCdkWorkshopStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        // defines an AWS Lambda resource
        const hello = new lambda.Function(this, 'HelloHandler', {
            runtime: lambda.Runtime.NODEJS_10_X,    // exection environment
            code: lambda.Code.fromAsset('lambda'),  // code loaded from "lambda" direcrory
            handler: 'hello.handler'                // file is "hello", function is "handler"
        });

        // defines an API Geteway REST API resource backed by our "hello" function.
        new apigw.LambdaRestApi(this, 'Endpoint', {
            handler: hello
        });
    }
}
