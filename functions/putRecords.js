const records = require('./putTableRecords');

/**
  * PUT /putRecords
  *
  * Inserts a record into table.
  * @returns {Array.Object}
  */
exports.handler = async (event) => {
  const user = JSON.parse(event.requestContext.authorizer.user);
  const updatedByUser = user.username;
  const body = JSON.parse(event.body);
  const { tableName, Id, paymentStatus } = body;
  console.log();
  records.update(tableName, Id, paymentStatus, updatedByUser);
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({ Records: 'Put' }),
  };
  return response;
};
