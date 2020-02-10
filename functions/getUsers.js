const AWS = require('aws-sdk');

AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const startUserLogin = async (username, password) => {
  try {
    const params = {
      ExpressionAttributeNames: {
        '#Id': 'Id',
        '#username': 'username',
        '#password': 'password',
        '#accountType': 'accountType',
      },
      ExpressionAttributeValues: {
        ':username': {
          S: username,
        },
        ':password': {
          S: password,
        },
      },
      FilterExpression: 'username = :username and password  = :password',
      ProjectionExpression: '#Id,#username,#password,#accountType',
      TableName: 'Accounts',
    };

    const data = await dynamodb.scan(params).promise();
    if (data.Items.length === 0) {
      throw new Error('Uh nope! Please check what you entered again');
    }

    return data.Items[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  startUserLogin,
};


// startUserLogin('joseph');
