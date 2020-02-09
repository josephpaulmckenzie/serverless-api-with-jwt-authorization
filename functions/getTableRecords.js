const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

// eslint-disable-next-line consistent-return
const scanTable = async (tableName) => {
  try {
    const params = {
      ExpressionAttributeNames: {
        '#Id': 'Id',
      },
      ProjectionExpression: '#Id,FirstName,LastName',
      TableName: tableName,
    };

    const data = await dynamodb.scan(params).promise();
    // const recordCount = `Records found: ${data.Count}`;
    return data.Items;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  scanTable,
};
