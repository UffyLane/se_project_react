export function normalizeCondition(condition) {
  const map = {
    Clear: "clear",
    Clouds: "cloudy",
    Rain: "rain",
    Drizzle: "rain",
    Thunderstorm: "rain",
    Snow: "snow",
    Mist: "fog",
    Fog: "fog",
    Haze: "fog",
  };

  return map[condition] || "clear";
}
