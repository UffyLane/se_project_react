import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import "./Welcome.css";

const CONDITION_WORDS = {
  clear: "clear",
  clouds: "cloudy",
  fog: "foggy",
  rain: "rainy",
  snow: "snowy",
  storm: "stormy",
};

const ADVICE = {
  hot: "keep it light",
  warm: "light layers will do",
  cold: "bundle up",
};

// Hero shown to signed-out visitors. The background follows the live weather
// (condition + day/night), so the page already shows what the app does.
function Welcome({ weatherData, weatherStatus, onSignUpClick, onLogInClick }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const isReady = weatherStatus === "ready";
  const isDay = weatherData.isDay ? "day" : "night";
  const theme =
    isReady && CONDITION_WORDS[weatherData.condition]
      ? `${weatherData.condition}-${isDay}`
      : "default";

  let status;
  if (isReady) {
    const word = CONDITION_WORDS[weatherData.condition];
    status = (
      <>
        It&apos;s{" "}
        <strong>
          {weatherData.temp[currentTemperatureUnit]}°{currentTemperatureUnit}
        </strong>
        {word ? ` and ${word}` : ""} — {ADVICE[weatherData.type]}.
      </>
    );
  } else if (weatherStatus === "error") {
    status =
      "We couldn't reach the weather service right now. Try the sample outfits below.";
  } else {
    status = "Checking your local weather…";
  }

  return (
    <section className={`welcome welcome_theme_${theme}`}>
      <div className="welcome__content">
      <h1 className="welcome__title">What should I wear today?</h1>

      <p className="welcome__status" aria-live="polite">
        {status}
      </p>

      <p className="welcome__text">
        WTWR checks the weather where you are and matches it to the clothes in
        your own wardrobe.
      </p>

      <div className="welcome__actions">
        <button
          type="button"
          className="welcome__button welcome__button_type_primary"
          onClick={onSignUpClick}
        >
          Create your wardrobe
        </button>
        <button
          type="button"
          className="welcome__button welcome__button_type_secondary"
          onClick={onLogInClick}
        >
          Log in
        </button>
      </div>
      </div>

      {isReady && (
        <p className="welcome__temp" aria-hidden="true">
          {weatherData.temp[currentTemperatureUnit]}°
        </p>
      )}
    </section>
  );
}

export default Welcome;
