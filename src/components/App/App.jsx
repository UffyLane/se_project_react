import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { filterWeatherData, getWeather } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import Footer from "../Footer/Footer";

function App() {
  const [activeRadioIndex, setActiveRadioIndex] = useState(null);
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, city: "" },
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const weatherTypes = ["Hot", "Warm", "Cold"];

const handleRadioChange = (index) => {
  setActiveRadioIndex(index);
  setWeatherData((prev) => ({
    ...prev,
    type: weatherTypes[index],
  }));
};

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer/>
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
            minLength="2"
            maxLength="200"
            required
          />
          <span class="modal__error" id="modal__label-input-error"></span>
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{""}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
            required
          />
           <span class="modal__error" id="modal__label-input-error"></span>
        </label>
        <fieldset className="modal__radio-buttons">
  <legend className="modal__legend">Select the weather type:</legend>
  <div className="modal__radio-input-container">
    {weatherTypes.map((label, index) => {
      const id = `weather-${label.toLowerCase()}`;
      return (
        <label
          key={id}
          htmlFor={id}
          className="modal__label_type_radio"
        >
          <input
            type="radio"
            id={id}
            name="weather"
            className="radio modal__radio-input"
            checked={activeRadioIndex === index}
            onChange={() => handleRadioChange(index)}
          />
          {label}
        </label>
      );
    })}
  </div>
</fieldset>

      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
