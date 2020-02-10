const crypto = require('crypto');

const encrypt = (password) => {
  try {
    const hash = crypto.createHmac('sha256', password)
      .update('I-love-newfies')
      .digest('hex');
    return hash;
  } catch (error) {
    console.log('crypto support is disabled!', error);
    throw error;
  }
};


// crypt('password');

module.exports = {
  encrypt,
};
