const records = require('./getTableRecords');

/**
  * GET /getRecords
  *
  * Returns a collection of records.
  * @returns {Array.Object}
  */

  exports.handler = async (event) => {
    // For mnpw we can hardcode the table name but shotly we will want to add a variable to the get request
  const results = await records.scanTable('Records')
    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({"Records":results})
    };
    return response;
  };
