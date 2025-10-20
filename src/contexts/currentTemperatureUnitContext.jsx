import React, { createContext, useContext, useState } from "react";

const CurrentTemperatureUnitContext = createContext();

export const CurrentTemperatureUnitProvider = ({ children }) => {
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, setCurrentTemperatureUnit }}>
      {children}
    </CurrentTemperatureUnitContext.Provider>
  );
};

export const useCurrentTemperatureUnit = () => {
  const context = useContext(CurrentTemperatureUnitContext);
  if (!context) {
    throw new Error("useCurrentTemperatureUnit must be used within a CurrentTemperatureUnitProvider");
  }
  return context;
};

export default CurrentTemperatureUnitContext;
