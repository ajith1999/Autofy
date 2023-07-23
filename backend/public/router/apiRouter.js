const express = require("express");
const router = express.Router();
const { faker } = require('@faker-js/faker');

router.get("/", (req, res) => {
  const jsonData = req.body;

  console.log(jsonData.content); // Array of content objects
  console.log(jsonData.rows); // 100
  console.log(jsonData.downloadType); // null


  res.status(200).json(generateData(jsonData));
});

function generateRandomData(dataType) {
  switch (dataType) {
    case 'name':
      return faker.person.firstName();
    case 'email':
      return faker.internet.email();
    case 'address':
      return faker.address.streetAddress();
    case 'phoneNumber':
      return faker.phone.number();
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

module.exports = router;
