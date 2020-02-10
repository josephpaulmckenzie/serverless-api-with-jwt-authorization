/* eslint-disable import/no-extraneous-dependencies */

const _ = require('lodash');
const accounts = require('../functions/getUsers');

const UsersDB = [
  {
    username: 'joseph',
    password: 'password', // User password
    scopes: ['putRecords', 'create_new_user_account'], // Authorized actions: This user has access to update records
  },
  {
    username: 'anotheruser',
    password: 'password',
    scopes: [],
  },
];

/**
  * Returns a user, given a username and valid password.
  *
  * @method login
  * @param {String} username - user id
  * @param {String} password  - Allow / Deny
  * @throws Will throw an error if a user is not found or if the password is wrong.
  * @returns {Object} user
  */

const login = async (username, password) => {
  const loginDetails = await accounts.startUserLogin(username, password);
  const user = loginDetails.username.S;
  const encryptedPassword = loginDetails.password.S;

  if (!user) throw new Error('Invalid user/password combo');

  const hasValidPassword = (encryptedPassword === password);
  if (!hasValidPassword) throw new Error('Invalid user/password combo');

  return _.omit(user, 'password');
};


module.exports = {
  login,
};
