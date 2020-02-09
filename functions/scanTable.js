const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});
const dynamodb = new AWS.DynamoDB.DocumentClient();

const scanTable = async()=>{
  try {
    const params = {
      ExpressionAttributeNames: {
        '#Id': 'Id'
      },
      ProjectionExpression: '#Id',
      TableName: 'Records',
    };
      
    const data = await dynamodb.scan(params).promise();
    const recordCount = `Records found: ${data.Count}`;
    console.log(`${recordCount}`);
    console.log(data.Items);
    return data.Items;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
    scanTable,
  };

// c();