
const AWS = require('aws-sdk');
const moment = require('moment');
const uuidv4 = require('uuid/v4');
const validator = require('../lib/validator');
// var validator = require('validator');

// moment().format();
AWS.config.update({
  region: 'us-east-1',
});

const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

/**
  * Returns a new user account.
  *
  * @method createAccount
  * @param {String} firstName - Users First name
  * @param {String} lastName  - Users Last name
  * @param {String} userType - User account type
  * @throws Will throw an error if all params are not entered
  * @returns {Object} new account Details
  */

const userIdGen = uuidv4();
let timestamp = new Date();
timestamp = moment(timestamp).format('MM/DD/YYYY hh:mm:ss a');

const createAccount = async (userDetails) => {
  // validator and sanitizer for userinfo
  const checked = await validator.validate(userDetails);

  const {
    userId, firstName, lastName, emailAddress, createdAt,
  } = checked;

  try {
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
    console.log('New record');
    await dynamodb.putItem(params).promise();
  } catch (error) {
    console.log(error);
    throw error;
  }
};


createAccount({
  userId: userIdGen, firstName: 'Joseph', lastName: 'Mckenzie', emailAddress: 'me@josephpmckenzie.com', createdAt: timestamp,
});
