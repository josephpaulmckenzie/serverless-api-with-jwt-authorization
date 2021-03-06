const jwt = require('jsonwebtoken');
const users = require('../lib/users');
const crypto = require('../lib/crypto');

const JWT_EXPIRATION_TIME = '60m';

/**
  * POST /sessions
  *
  * Returns a JWT, given a username and password.
  * @method login
  * @param {String} event.body.username
  * @param {String} event.body.password
  * @throws Returns 401 if the user is not found or password is invalid.
  * @returns {Object} jwt that expires in 60 mins
  */

exports.handler = async (event) => {
  try {
    const { username, password } = JSON.parse(event.body);

    // Authenticate user
    const user = await users.login(username, crypto.encrypt(password));

    // Issue JWT
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });

    const response = { // Success response
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        token,
      }),
    };

    return response;
  } catch (e) {
    console.log(`Error logging in: ${e.message}`);
    const response = { // Error response
      statusCode: 401,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: e.message }),
    };
    return response;
  }
};
