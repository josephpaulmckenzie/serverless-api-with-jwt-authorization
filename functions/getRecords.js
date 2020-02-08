/**
  * GET /cats
  *
  * Returns a collection of cats.
  * @returns {Array.Object}
  */

  exports.handler = async (event) => {
    console.log('getRecords');

    const response = {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({"Records":"Hello"})
    };
    return response;
  };
