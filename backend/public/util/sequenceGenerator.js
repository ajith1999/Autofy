

// Function to generate a random alphanumeric string of a specified length
function generateRandomAlphanumeric(length) {
  let result = '';
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

// Function to generate a sequential alphanumeric series in the specified format
function generateSequentialSeries(format, lastNumber) {
  const dynamicDashesRegex = /#+/g;
  const matches = format.match(dynamicDashesRegex);
  
  if (!matches || matches.length === 0) {
    throw new Error("Invalid format for sequential series. Format should contain at least one '#' symbol.");
  }

  let nextNumber = lastNumber + 1;
  const generatedPart = nextNumber.toString().padStart(matches[0].length, '0');

  return format.replace(dynamicDashesRegex, generatedPart);
}

// Function to generate a random or sequential alphanumeric series based on the input format
function generateRandomSeries(format, lastNumber) {
  const dynamicDashesRegex = /#+/g;
  const matches = format.match(dynamicDashesRegex);

  if (matches) {
    const middlePart = generateRandomAlphanumeric(matches[0].length);
    return format.replace(dynamicDashesRegex, middlePart);
  } else {
    return generateSequentialSeries(format, lastNumber);
  }
}

// Function to generate a random number within a range (inclusive)
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a random decimal number within a range
function generateRandomDecimal(min, max, decimalPlaces) {
  const randomDecimal = Math.random() * (max - min) + min;
  return parseFloat(randomDecimal.toFixed(decimalPlaces));
}

// Function to generate a sequential number series within a range
function generateSequentialNumberSeries(startNumber, endNumber) {
  if (startNumber > endNumber) {
    throw new Error("Invalid range for sequential series. Start number should be less than or equal to end number.");
  }

  return startNumber;
}

module.exports = {
  generateRandomSeries,
  generateSequentialSeries,
  generateRandomNumber,
  generateRandomDecimal,
  generateSequentialNumberSeries
};
