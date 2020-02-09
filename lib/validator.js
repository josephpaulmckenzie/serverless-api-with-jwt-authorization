const validator = require('validator');


const validate = async (userDetails) => {
  console.log(userDetails);
  const {
    userId, firstName, lastName, emailAddress, createdAt,
  } = userDetails;

  const isValidUUID = validator.isUUID(userId);
  const hasFirstName = !validator.isEmpty(firstName);
  const hasLastName = !validator.isEmpty(lastName);
  const isValidEmail = validator.isEmail(emailAddress);
  //   const isValidDate = validator.isRFC3339(createdAt);

  if (!isValidUUID) throw new Error('A invalid userId was generated');

  if (!hasFirstName) throw new Error('Please provide a forename');

  if (!hasLastName) throw new Error('Please provide a surname');

  if (!isValidEmail) throw new Error('Please provide an email address');


  // returns an object withsantized data
  return userDetails;
  // console.log(isfirstName, islastName, isValidEmail);
  // throw new Error('Did not pass validation');
//   } else {
//     return userDetails;
//   }
};

module.exports = {
  validate,
};
