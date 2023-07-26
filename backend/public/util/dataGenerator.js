const { faker } = require("@faker-js/faker");
const {
  randPhoneNumber,
  randAirportCode,
  randCompanyName,
  randCurrencyCode,
  randBetweenDate,
} = require("@ngneat/falso");
const {
  generateRandomSeries,
  generateSequentialSeries,
  generateRandomNumber,
  generateRandomDecimal,
  generateSequentialNumberSeries,
} = require("./sequenceGenerator");

function generateRandomData(dataType, options, sequence) {
  switch (dataType) {
    case "name":
      return faker.person.firstName();
    case "email":
      return faker.internet.email();
    case "address":
      return faker.location.streetAddress();
    case "phone_number":
      const code = options?.country_code ?? "IN";
      return randPhoneNumber({ countryCode: code });
    case "airport_code":
      return randAirportCode();
    case "company_name":
      return randCompanyName();
    case "alpha_numeric":
      const size = options?.size ?? 8;
      return faker.string.alphanumeric(size);
    case "currency_code":
      return randCurrencyCode();

    case "boolean":
      return faker.datatype.boolean();

    case "date_time":
      return randBetweenDate({
        from: new Date(options.min_date),
        to: new Date(options.max_date),
      });

    case "naming_series":
      const { is_random, format } = options;

      if (
        typeof is_random !== "boolean" ||
        typeof format !== "string" ||
        !format.includes("###")
      ) {
        throw new Error(
          "Invalid options. 'is_random' should be boolean and 'format' should be a string containing '###'."
        );
      }
      if (is_random) {
        return generateRandomSeries(format);
      } else {
        return generateSequentialSeries(format, sequence);
      }
    case "number":
      if (!options?.is_random && (!options.min || !options.max)) {
        throw new Error(
          "Invalid options. For number datatype, 'is_random', 'min', 'max' are required."
        );
      }
      if (options?.decimal_place) {
        return generateRandomDecimal(
          options.min,
          options.max,
          options.decimal_place
        );
      }
      if (options.is_random) {
        return generateRandomNumber(options.min, options.max);
      } else {
        return generateSequentialNumberSeries(options.min, options.max);
      }

    case "custom":
      if (
        !options?.value ||
        !Array.isArray(options.value) ||
        options.value.length === 0
      ) {
        throw new Error(
          "Invalid options. For custom datatype, 'value' should be a non-empty array."
        );
      }

      const randomIndex = generateRandomNumber(0, options.value.length - 1);
      return options.value[randomIndex];
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
      const { name, datatype_json, options } = field;
      dataRow[name] = generateRandomData(datatype_json, options, i); // Call faker method dynamically
    }

    output.push(dataRow);
  }

  return output;
}

module.exports = {
  generateData,
};
