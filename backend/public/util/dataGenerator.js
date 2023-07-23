const { faker } = require("@faker-js/faker");
const { randPhoneNumber } = require("@ngneat/falso");

function generateRandomData(dataType) {
  switch (dataType) {
    case "name":
      return faker.person.firstName();
    case "email":
      return faker.internet.email();
    case "address":
      return faker.address.streetAddress();
    case "phoneNumber":
      return randPhoneNumber();
    default:
      throw new Error(`Invalid data type: ${dataType}`);
  }
}

function generateData(input) {
  const { content, rows } = input;
  const output = [];

  for (let i = 0; i < rows; i++) {
    const dataRow = {};

    for (const field of content) {
      const { fieldName, dataType } = field;
      dataRow[fieldName] = generateRandomData(dataType); // Call faker method dynamically

      console.log(dataRow);
    }

    output.push(dataRow);
  }

  return output;
}

module.exports = {
  generateData,
};
