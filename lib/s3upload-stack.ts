import { Stack, StackProps, CfnParameter, CfnOutput, Fn } from "aws-cdk-lib";
import { Bucket, EventType } from "aws-cdk-lib/aws-s3";
import { Topic } from "aws-cdk-lib/aws-sns";
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { SnsDestination } from "aws-cdk-lib/aws-s3-notifications";
import { Construct } from "constructs";

export class S3UploadStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "emailOnCreateBucket");
    const topic = new Topic(this, "topic");

    bucket.addEventNotification(
      EventType.OBJECT_CREATED,
      new SnsDestination(topic)
    );

    const emails = ["itsmungai@gmail.com", "mungaihaha@gmail.com"];
    emails.forEach((email) => {
      topic.addSubscription(new EmailSubscription(email));
    });

    new CfnOutput(this, "bucketName", {
      value: bucket.bucketName,
    });
  }
}
