const AWS = require('aws-sdk');
const moment = require('moment');

moment().format();
AWS.config.update({
  region: 'us-east-1',
});
const docClient = new AWS
  .DynamoDB
  .DocumentClient({
    convertEmptyValues: true,
    endpoint: 'dynamodb.us-east-1.amazonaws.com',
  });

async function update(tableName, recordId, status, updatedByUser) {
  const results = [];

  try {
    const lastUpdated = new Date();
    const params = {
      TableName: tableName,
      Key: {
        Id: recordId,
      },
      UpdateExpression: 'set #Status = :Status,#last_updated = :last_updated, #updatedByUser = :updatedByUser',
      ExpressionAttributeNames: {
        '#Status': 'Status',
        '#last_updated': 'last_updated',
        '#updatedByUser': 'updatedByUser',
      },
      ExpressionAttributeValues: {
        ':Status': status,
        ':last_updated': moment(lastUpdated).toISOString(),
        ':updatedByUser': updatedByUser,
      },
    };
    const item = await docClient
      .update(params)
      .promise();
    results.push(item);
  } catch (error) {
    console.log(error);
    throw error;
  }
  // return communityId;
}

module.exports = {
  update,
};
