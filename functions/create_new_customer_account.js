
const AWS = require('aws-sdk');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const validator = require('../lib/validator');

AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

/**
  *
  * @method createAccount - Creats a new user account.
  * @param {String} userId - Users generated Id - auto generated
  * @param {String} firstName - Users First name - required
  * @param {String} lastName  - Users Last name  - required
  * @param {String} emailAddress - Users email address - required
  * @param {String} createdAt - time of account creation - auto generated
  * @throws Will throw an error if all params do not pass validation check
  * @returns {Object} newly created account details
  */

const createAccount = async (userDetails) => {
  try {
    // validator and sanitizer for userinfo
    const checked = await validator.validate(userDetails);
    const {
      userId, firstName, lastName, emailAddress, createdAt,
    } = checked;

    const params = {
      Item: {
        Id: {
          S: userId,
        },
        firstName: {
          S: firstName,
        },
        lastName: {
          S: lastName,
        },
        emailAddress: {
          S: emailAddress,
        },
        createdAt: {
          S: createdAt,
        },
      },
      TableName: 'Records',
    };
    console.log('New record created');
    await dynamodb.putItem(params).promise();
    return checked;
  } catch (error) {
    console.log(error.message);
    const response = {
      statusCode: 400,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: error.message,
    };
    return response;
  }
};


exports.handler = async (event) => {
  const { firstName, lastName, emailAddress } = JSON.parse(event.body);
  const userId = uuidv4();
  let createdAt = new Date();
  createdAt = moment(createdAt).format('MM/DD/YYYY hh:mm:ss a');

  const results = await createAccount({
    userId, firstName, lastName, emailAddress, createdAt,
  });
  const response = {
    statusCode: results.statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({ Records: results }),
  };
  return response;
};
