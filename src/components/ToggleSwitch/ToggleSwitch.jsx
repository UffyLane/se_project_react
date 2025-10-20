import "./ToggleSwitch.css";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";

export default function ToggleSwitch() {
  const { currentTemperatureUnit, setCurrentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const handleToggle = () => {
    const newUnit = currentTemperatureUnit === "F" ? "C" : "F";
    setCurrentTemperatureUnit(newUnit);
  };

  return (
    <label className="toggle-switch">
      <input type="checkbox" className="toggle-switch__checkbox" onChange={handleToggle}  aria-label={`Switch to ${currentTemperatureUnit === "F" ? "Celsius" : "Fahrenheit"}`} />
      <span className="toggle-switch__slider"></span>
      <span className={`toggle-switch__label toggle-switch__label_F ${currentTemperatureUnit === "F" ? "toggle-switch__label_color_active" : ""}`}>F</span>
      <span className={`toggle-switch__label toggle-switch__label_C ${currentTemperatureUnit === "C" ? "toggle-switch__label_color_active" : ""}`}>C</span>
    </label>
  );
}
