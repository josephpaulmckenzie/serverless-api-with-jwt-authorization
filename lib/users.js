/* eslint-disable import/no-extraneous-dependencies */

const _ = require('lodash');

const UsersDB = [
  {
    username: 'joseph',
    password: 'password', // User password
    scopes: ['putRecords'], // Authorized actions: This user has access to update records
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

const login = (username, password) => {
  const user = _.find(UsersDB, { username });
  if (!user) throw new Error('Invalid user/password combo');

  const hasValidPassword = (user.password === password);
  if (!hasValidPassword) throw new Error('Invalid user/password combo');

  return _.omit(user, 'password');
};

module.exports = {
  login,
};
