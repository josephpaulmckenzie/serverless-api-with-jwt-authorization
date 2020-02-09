const records = require('./updateRecord');


/**
  * PUT /putRecords
  *
  * Inserts a record into table.
  * @returns {Array.Object}
  */
 exports.handler = async (event) => {
   const body =JSON.parse(event.body);
   const tableName = body.tableName;
   const Id = body.Id;
   console.log();
  records.update(tableName,Id)
  const user = JSON.parse(event.requestContext.authorizer.user);
  // console.log(user);

  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify({"Records":"Put"})
  };
  return response;
};
