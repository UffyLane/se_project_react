import ReactDOM from "react-dom/client";
import React from "react";
import App from "./components/App/App";
import { BrowserRouter } from "react-router-dom";
import { CurrentTemperatureUnitProvider } from "./contexts/currentTemperatureUnitContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CurrentTemperatureUnitProvider>
        <App />
      </CurrentTemperatureUnitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
