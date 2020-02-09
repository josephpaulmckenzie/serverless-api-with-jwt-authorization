const AWS = require('aws-sdk');
const moment = require('moment');

moment().format();
AWS.config.update({
  region: 'us-east-1',
});
const docClient = new AWS
  .DynamoDB
  .DocumentClient({ convertEmptyValues: true,
    endpoint: 'dynamodb.us-east-1.amazonaws.com',
  });

async function update(tableName, recordId) {
  const results = [];

  try {
    const last_updated = new Date();
    console.log(last_updated);
    const params = {
      TableName: tableName,
      Key: {
        Id: recordId,
      },
      UpdateExpression: 'set #FirstName = :FirstName,#last_updated = :last_updated',
      ExpressionAttributeNames: {
        '#FirstName': 'FirstName',
        '#last_updated': 'last_updated',
        // "#updated_at": "updated_at"
      },
      ExpressionAttributeValues: {
        ':FirstName': 'Joe',
        ':last_updated': moment(last_updated).toISOString(),
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
