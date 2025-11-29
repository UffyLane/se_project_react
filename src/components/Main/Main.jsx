import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { useContext } from "react";
import "./Main.css";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  onDeleteItem,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]}°
          {currentTemperatureUnit} / You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              const itemWeather = item?.weather?.toLowerCase?.() || "";
              const weatherType = weatherData?.type?.toLowerCase?.() || "";
              return itemWeather === weatherType;
            })
            .map((item) => (
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
      </section>
    </main>
  );
}

export default Main;



