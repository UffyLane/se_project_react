import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import Welcome from "../Welcome/Welcome";
import HowItWorks from "../HowItWorks/HowItWorks";
import SampleOutfit from "../SampleOutfit/SampleOutfit";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";
import "./Main.css";

function Main({
  weatherData,
  weatherStatus,
  handleCardClick,
  clothingItems,
  onCardLike,
  onDeleteItem,
  isLoggedIn,
  onLogInClick,
  onSignUpClick,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const isWeatherReady = weatherStatus === "ready";

  // Signed-out visitors get a landing page that shows what the app does.
  if (!isLoggedIn) {
    return (
      <main className="main">
        <Welcome
          weatherData={weatherData}
          weatherStatus={weatherStatus}
          onSignUpClick={onSignUpClick}
          onLogInClick={onLogInClick}
        />
        <HowItWorks />
        <SampleOutfit
          currentType={isWeatherReady ? weatherData.type : null}
          onSignUpClick={onSignUpClick}
        />
      </main>
    );
  }

  const matchingItems = clothingItems.filter((item) => {
    const itemWeather = item?.weather?.toLowerCase?.() || "";
    const weatherType = weatherData?.type?.toLowerCase?.() || "";
    return itemWeather === weatherType;
  });

  let message;
  if (isWeatherReady) {
    message = `Today is ${weatherData.temp[currentTemperatureUnit]}°${currentTemperatureUnit} / You may want to wear:`;
  } else if (weatherStatus === "error") {
    message =
      "We couldn't load the weather right now, so outfit suggestions aren't available.";
  } else {
    message = "Checking the weather…";
  }

  return (
    <main className="main">
      {isWeatherReady && <WeatherCard weatherData={weatherData} />}

      <section className="cards">
        <p className="cards__text">{message}</p>

        {isWeatherReady && matchingItems.length === 0 && (
          <p className="cards__text">
            No {weatherData.type}-weather clothes yet. Use + Add Clothes to add
            some.
          </p>
        )}

        {isWeatherReady && matchingItems.length > 0 && (
          <ul className="cards__list">
            {matchingItems.map((item) => (
              <ItemCard
                key={item._id || item.id || item.name}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                onDeleteItem={onDeleteItem}
                variant="main"
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default Main;
