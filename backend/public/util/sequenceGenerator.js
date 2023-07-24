

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

module.exports = {
  generateRandomSeries,
  generateSequentialSeries
};

// // Example usage:
// let lastGeneratedNumber = 100; // For sequential series, keep track of the last generated number
// const inputFormat = "shi##tt";

// // Generate 5 random series
// for (let i = 0; i < 5; i++) {
//   const randomSeries = generateRandomSeries(inputFormat);
//   console.log(randomSeries);
// }

// // Generate 5 sequential series
// for (let i = 0; i < 5; i++) {
//   const sequentialSeries = generateRandomSeries(inputFormat, lastGeneratedNumber);
//   console.log(sequentialSeries);
//   lastGeneratedNumber++; // Increment the last generated number for the next iteration
// }
