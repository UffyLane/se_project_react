import { convertToCelsius } from "./helper";

export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const tempF = Math.round(data.main.temp); // API returns in F because of units=imperial
  const tempC = convertToCelsius(tempF);

  return {
    city: data.name,
    temp: { F: tempF, C: tempC },
    type: getWeatherType(tempF), // thresholds in F
    condition: normalizeCondition(data.weather[0].main.toLowerCase()),
    isDay: isDay(data.sys, Date.now()),
  };
};

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

const getWeatherType = (temperatureF) => {
  if (temperatureF > 86) {
    return "hot";
  } else if (temperatureF >= 66 && temperatureF < 86) {
    return "warm";
  } else {
    return "cold";
  }
};

function normalizeCondition(condition) {
  const map = {
    mist: "fog",
    haze: "fog",
    drizzle: "rain",
    thunderstorm: "storm",
  };
  return map[condition] || condition;
}
