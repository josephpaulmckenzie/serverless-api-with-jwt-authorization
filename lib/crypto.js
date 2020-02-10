const crypto = require('crypto');
require('dotenv').config();

/**
  *
  * Returns an encypted String
  * @method encrypt
  * @param {String} password
  * @throws Returns error if cyrpto is not supported
  * @returns {String} encrypted string
  */
const encrypt = (password) => {
  try {
    const hash = crypto.createHmac('sha256', password)
      .update(process.env.salt)
      .digest('hex');
    return hash;
  } catch (error) {
    console.log('crypto support is disabled!', error);
    throw error;
  }
};

module.exports = {
  encrypt,
};
