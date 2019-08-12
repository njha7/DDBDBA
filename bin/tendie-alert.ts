#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { TendieAlertStack } from '../lib/tendie-alert-stack';

const app = new cdk.App();
new TendieAlertStack(app, 'TendieAlertStack');
