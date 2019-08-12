import cdk = require('@aws-cdk/core');
import s3 = require('@aws-cdk/aws-s3');
import events = require('@aws-cdk/aws-events');
import targets = require('@aws-cdk/aws-events-targets');
import lambda = require('@aws-cdk/aws-lambda');
import sns = require('@aws-cdk/aws-sns');
import { Duration } from '@aws-cdk/core';

export class TendieAlertStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    //TODO API gateway with endpoint to sub to sns topic
    // https://aws.amazon.com/blogs/architecture/create-dynamic-contact-forms-for-s3-static-websites-using-aws-lambda-amazon-api-gateway-and-amazon-ses/

    const signUpSiteBucket = new s3.Bucket(this, 'webformBucket', {
      //TODO S3 hosted site
    });

    const tendieSNSTopic = new sns.Topic(this, 'tendieAlert', {
      displayName: "TenderSubSale"
    });

    const saleCheckLambda = new lambda.Function(this, 'saleCheck', {
      runtime: lambda.Runtime.NODEJS_8_10,
      code: lambda.Code.asset('sales-check-lambda'),
      handler: 'index.handler',
      logRetention: 7,
      timeout: Duration.seconds(30),
      memorySize: 126,
      environment: {
        ON_SALE_BUCKET: signUpSiteBucket.bucketName,
        ON_SALE_BYTE: 'resources/onSaleByte',
        ON_SALE_TOPIC: tendieSNSTopic.topicArn
      }
    });

    // Check the sale status of pubsubs at 11am EST, just in time for lunch :^)
    const dailyCheck = new events.Rule(this, 'saleCheckCRON', {
      schedule: events.Schedule.expression('cron(0 0 11 ? * * *)')
    });
    dailyCheck.addTarget(new targets.LambdaFunction(saleCheckLambda));
  }
}
