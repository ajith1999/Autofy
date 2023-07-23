const { faker } = require("@faker-js/faker");
const { randPhoneNumber } = require("@ngneat/falso");

function generateRandomData(dataType,options) {
  switch (dataType) {
    case "name":
      return faker.person.firstName();
    case "email":
      return faker.internet.email();
    case "address":
      return faker.address.streetAddress();
    case "phoneNumber":
      const code = options?.code ?? 'IN';  
      return randPhoneNumber({ countryCode: code });
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
      const { fieldName, dataType , options} = field;
      dataRow[fieldName] = generateRandomData(dataType,options); // Call faker method dynamically

      console.log(dataRow);
    }

    output.push(dataRow);
  }

  return output;
}

module.exports = {
  generateData,
};
