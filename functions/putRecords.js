/**
  * PUT /putRecords
  *
  * Inserts a record into table.
  * @returns {Array.Object}
  */
 exports.handler = async (event) => {
  console.log('getPangolins');
  console.log(event);

  const user = JSON.parse(event.requestContext.authorizer.user);
  console.log(user);

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({"Records":"Put"})
  };
  return response;
};
