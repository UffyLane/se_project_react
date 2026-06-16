// ---------------------------
// WEATHER IMAGES
// ---------------------------
export const weatherOptions = [
  { day: true, condition: "clear", url: new URL("../assets/day/clear.png", import.meta.url).href },
  { day: true, condition: "clouds", url: new URL("../assets/day/cloudy.png", import.meta.url).href },
  { day: true, condition: "fog", url: new URL("../assets/day/fog.png", import.meta.url).href },
  { day: true, condition: "rain", url: new URL("../assets/day/rain.png", import.meta.url).href },
  { day: true, condition: "snow", url: new URL("../assets/day/snow.png", import.meta.url).href },
  { day: true, condition: "storm", url: new URL("../assets/day/storm.png", import.meta.url).href },

  { day: false, condition: "clear", url: new URL("../assets/night/clear.png", import.meta.url).href },
  { day: false, condition: "clouds", url: new URL("../assets/night/cloudy.png", import.meta.url).href },
  { day: false, condition: "fog", url: new URL("../assets/night/fog.png", import.meta.url).href },
  { day: false, condition: "rain", url: new URL("../assets/night/rain.png", import.meta.url).href },
  { day: false, condition: "snow", url: new URL("../assets/night/snow.png", import.meta.url).href },
  { day: false, condition: "storm", url: new URL("../assets/night/storm.png", import.meta.url).href },
];

// ---------------------------
// DEFAULT WEATHER IMAGES (REQUIRED BY WeatherCard.jsx)
// ---------------------------
export const defaultWeatherOptions = {
  day: {
    url: new URL("../assets/day/default.png", import.meta.url).href,
  },
  night: {
    url: new URL("../assets/night/default.png", import.meta.url).href,
  },
};

// ---------------------------
// DEFAULT CLOTHING ITEMS
// ---------------------------
export const defaultClothingItems = [
  {
    id: 0,
    _id: 0,
    name: "Cap",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Cap.png",
  },
  {
    id: 1,
    _id: 1,
    name: "Hoodie",
    weather: "warm",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Hoodie.png",
  },
  {
    id: 2,
    _id: 2,
    name: "Jacket",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jacket.png",
  },
  {
    id: 3,
    _id: 3,
    name: "Sneakers",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png",
  },
  {
    id: 4,
    _id: 4,
    name: "T-Shirt",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/T-Shirt.png",
  },
  {
    id: 5,
    _id: 5,
    name: "Coat",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Coat.png",
  },
  {
    id: 6,
    _id: 6,
    name: "Dress",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Dress.png",
  },
  {
    id: 7,
    _id: 7,
    name: "Jeans",
    weather: "warm",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Jeans.png",
  },
  {
    id: 8,
    _id: 8,
    name: "Raincoat",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Raincoat.png",
  },
  {
    id: 9,
    _id: 9,
    name: "Sandals",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sandals.png",
  },
  {
    id: 10,
    _id: 10,
    name: "Shorts",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Shorts.png",
  },
  {
    id: 11,
    _id: 11,
    name: "Sneakers",
    weather: "warm",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sneakers.png",
  },
  {
    id: 12,
    _id: 12,
    name: "Sunglasses",
    weather: "hot",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sunglasses.png",
  },
  {
    id: 13,
    _id: 13,
    name: "Sweatshirt",
    weather: "warm",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweatshirt.png",
  },
  {
    id: 14,
    _id: 14,
    name: "Beanie",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Beanie.png",
  },
  {
    id: 15,
    _id: 15,
    name: "Boot",
    weather: "cold",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Boot.png",
  },
  {
    id: 17,
    _id: 17,
    name: "Sweater",
    weather: "warm",
    imageUrl: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Sweater.png",
  },
];

// ---------------------------
export const coordinates = {
  latitude: 44.854031,
  longitude: -93.460167,
};

export const apiKey = import.meta.env.VITE_WEATHER_API_KEY;