import "./WeatherCard.css";
import { useContext } from "react";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // weatherAPI.js already normalizes the condition (mist/haze -> fog, etc.)
  const normalizedCondition = weatherData.condition;

  const filteredOptions = weatherOptions.filter((option) => {
    return option.day === weatherData.isDay && option.condition === normalizedCondition;
  });

  const weatherOption =
    filteredOptions.length === 0
      ? defaultWeatherOptions[weatherData.isDay ? "day" : "night"]
      : filteredOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Weather: ${normalizedCondition}, ${weatherData.isDay ? "daytime" : "nighttime"}`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
