

const convertToCelsius = (fahrenheit) => {
  return Math.round(((fahrenheit - 32) * 5) / 9);
};

const convertToFahrenheit = (celsius) => {
  return Math.round((celsius * 9) / 5 + 32);
};



export { convertToCelsius, convertToFahrenheit };