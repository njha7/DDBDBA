# PubSub Alert
PubSub Alert aims to check [http://arepublixchickentendersubsonsale.com](http://arepublixchickentendersubsonsale.com) everyday at 11am and send an SMS alert to subscribers if they go from not being on sale to on sale or vice versa.

## Design

### S3 Hosted Site
A dinky little webform hosted in S3 with a Lambda backed ajax call. Adds users to an SNS subscription

### Lambda CRON Job
A daily CRON job to check [http://arepublixchickentendersubsonsale.com](http://arepublixchickentendersubsonsale.com) and push alerts to SNS.

### OnSaleByte
A 1 byte S3 object to track the previous onSale status of chicken tender subs.

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template
