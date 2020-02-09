const records = require('../functions/scanTable');

/**
  * GET /cats
  *
  * Returns a collection of cats.
  * @returns {Array.Object}
  */

  exports.handler = async (event) => {
  const results =await records.scanTable()
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({"Records":results})
    };
    return response;
  };
