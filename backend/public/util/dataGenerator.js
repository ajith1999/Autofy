const { faker } = require("@faker-js/faker");
const {
  randPhoneNumber,
  randAirportCode,
  randCompanyName,
  randCurrencyCode,
} = require("@ngneat/falso");
const { generateRandomSeries } = require("./sequenceGenerator");

function generateRandomData(dataType, options) {
  switch (dataType) {
    case "name":
      return faker.person.firstName();
    case "email":
      return faker.internet.email();
    case "address":
      return faker.location.streetAddress();
    case "phoneNumber":
      const code = options?.country_code ?? "IN";
      return randPhoneNumber({ countryCode: code });
    case "airport_code":
      return randAirportCode();
    case "company_name":
      return randCompanyName();
    case "alpha_numeric":
      const size = options?.size ?? 5;
      return faker.string.alphanumeric(size);  
    case "currency_code":
      return randCurrencyCode();  
    case "naming_series":
      const { is_random, format } = options;

      if (typeof is_random !== 'boolean' || typeof format !== 'string' || !format.includes("###")) {
        throw new Error("Invalid options. 'is_random' should be boolean and 'format' should be a string containing '###'.");
      }
      return generateRandomSeries(format);  

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
      const { name, dataType, options } = field;
      dataRow[name] = generateRandomData(dataType, options); // Call faker method dynamically
    }

    output.push(dataRow);
  }

  return output;
}

module.exports = {
  generateData,
};
