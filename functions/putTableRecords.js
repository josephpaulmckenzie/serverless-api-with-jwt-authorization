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

async function update(tableName, recordId, status) {
  const results = [];

  try {
    const lastUpdated = new Date();
    console.log(lastUpdated);
    const params = {
      TableName: tableName,
      Key: {
        Id: recordId,
      },
      UpdateExpression: 'set #Status = :Status,#last_updated = :last_updated',
      ExpressionAttributeNames: {
        '#Status': 'Status',
        '#last_updated': 'last_updated',
        // "#updated_at": "updated_at"
      },
      ExpressionAttributeValues: {
        ':Status': status,
        ':last_updated': moment(lastUpdated).toISOString(),
        // ":updated_at": moment(updated_at).toISOString()
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
