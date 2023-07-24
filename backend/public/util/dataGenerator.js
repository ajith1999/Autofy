const { faker } = require("@faker-js/faker");
const { randPhoneNumber } = require("@ngneat/falso");

function generateRandomData(dataType,options) {
  switch (dataType) {
    case "name":
      return faker.person.firstName();
    case "email":
      return faker.internet.email();
    case "address":
      return faker.location.streetAddress();
    case "phoneNumber":
      const code = options?.country_code ?? 'IN';  
      return randPhoneNumber({ countryCode: code });
    default:
      throw new Error(`Invalid data type: ${dataType}`);
  }
}

function generateData(input) {
  const { columns_attributes, num_rows } = input;
  const output = [];

  for (let i = 0; i < num_rows; i++) {
    const dataRow = {};

    for (const field of columns_attributes) {
      const { name, dataType , options} = field;
      dataRow[name] = generateRandomData(dataType,options); // Call faker method dynamically

      console.log(dataRow);
    }

    output.push(dataRow);
  }

  return output;
}

module.exports = {
  generateData,
};
