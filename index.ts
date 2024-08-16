import { aws } from '@casual-simulation/infra';
import * as pulumi from '@pulumi/pulumi';

let config = new pulumi.Config();

const allowedOrigins = config.require('allowedOrigins');
const allowedApiOrigins = config.require('allowedApiOrigins');
const filesStorageClass = config.get('filesStorageClass');
const moderationJobSchedule = config.get('moderationJobSchedule');
const moderationJobPriority = config.get('moderationJobPriority');
const moderationJobProjectVersion = config.get('moderationJobProjectVersion');
const sesIdentityName = config.get('sesIdentityName');

new aws.serverless.CasualOSComponent('casualos', {
    allowedOrigins: allowedOrigins,
    allowedApiOrigins: allowedApiOrigins,
    filesStorageClass: filesStorageClass,
    sesIdentityName: sesIdentityName,
    moderationJobPriority: moderationJobPriority,
    moderationJobProjectVersion: moderationJobProjectVersion,
    moderationJobScheduleExpression: moderationJobSchedule,
    archive: new pulumi.asset.FileArchive('../casualos/src/aux-server/aux-backend/serverless/aws/dist/handlers'),
});