/* eslint-disable import/no-extraneous-dependencies */
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const utils = require('../lib/utils');

const authorizeUser = (userScopes, methodArn) => {
  const hasValidScope = _.some(userScopes, (scope) => _.endsWith(methodArn, scope));
  return hasValidScope;
};

/**
  * Authorizer functions are executed before your actual functions.
  * @method authorize
  * @param {String} event.authorizationToken - JWT
  * @throws Returns 401 if the token is invalid or has expired.
  * @throws Returns 403 if the token does not have sufficient permissions.
  */
exports.handler = async (event) => {
  const token = event.authorizationToken;
  try {
    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Checks if the user's scopes allow them to call the current endpoint ARN
    const { user } = decoded;

    const isAllowed = authorizeUser(user.scopes.S, event.methodArn);

    // Return an IAM policy document for the current endpoint
    const effect = isAllowed ? 'Allow' : 'Deny';
    const userId = user.username;
    const authorizerContext = { user: JSON.stringify(user) };
    const policyDocument = utils.buildIAMPolicy(userId, effect, event.methodArn, authorizerContext);

    return policyDocument;
  } catch (error) {
    console.log(error.message);
    return 'Unauthorized'; // Return a 401 Unauthorized response
  }
};
