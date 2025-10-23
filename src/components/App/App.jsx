import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import "./App.css"; 
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import {
  fetchClothes,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, ApiKey} from "../../utils/constants";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // ✅ added this
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) => (prevUnit === "F" ? "C" : "F"));
  }

  useEffect(() => {

    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        handleCloseModals();
      }
    }
    document.addEventListener("keydown", closeByEscape);
    return () => {
      document.removeEventListener("keydown", closeByEscape);
    }
  }, []);
  
  useEffect(() => {

    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        getWeather(coords, ApiKey)
          .then(filterWeatherData)
          .then(setWeatherData)
          .catch(console.error);
      }, (error) => {
        // If user denies geolocation or error occurs, use default coordinates
        console.warn(`Geolocation error (${error.code}): ${error.message}. Using default coordinates.`);
        getWeather(coordinates, ApiKey)
          .then(filterWeatherData)
          .then(setWeatherData)
          .catch(console.error);
      });
    } else {
      // Geolocation not supported, use default coordinates
      getWeather(coordinates, ApiKey)
        .then(filterWeatherData)
        .then(setWeatherData)
        .catch(console.error);
    }
  }, []);
  // ---- Modal Controls ----
  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
    setIsConfirmDeleteOpen(false);
  };

  // ---- Add Item ----
  const handleAddItem = (newItem) => {
    addClothingItem(newItem)
      .then((savedItem) => {
        setClothingItems((prevItems) => [savedItem, ...prevItems]);
        handleCloseModals();
      })
      .catch(console.error);
  };

  // ---- Open image modal ----
  const handleCardClick = (item) => setSelectedItem(item);

  // ---- Open delete confirmation ----
  const handleOpenDeleteConfirm = (item) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true);
  };

  // ---- Delete confirmed ----
  const handleDeleteItem = () => {
    deleteClothingItem(itemToDelete)
    .then(() => {
        // ✅ instantly update UI without refresh
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemToDelete)
        );
        handleCloseModals();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider value={{ currentTemperatureUnit, handleToggleSwitchChange }}>
    <div className="app">
      <Header
        handleAddClick={handleAddClick}
        weatherData={weatherData || { city: "", temp: { F: 0, C: 0 } }}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Main
              weatherData={
                weatherData || { city: "", temp: { F: 0, C: 0 }, type: "hot" }
              }
              handleCardClick={handleCardClick}
              clothingItems={clothingItems}
            />
          }
        />
        <Route
          path="/profile"
          element={
            <Profile
              clothingItems={clothingItems}
              onCardClick={handleCardClick}
              onDeleteItem={handleOpenDeleteConfirm}
              onAddNewClick={handleAddClick}
            />
          }
        />
      </Routes>

      <Footer />

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={handleCloseModals}
        onSubmit={handleAddItem}
      />

      <ItemModal
        isOpen={!!selectedItem}
        onClose={handleCloseModals}
        item={selectedItem}
        onDeleteItem={handleOpenDeleteConfirm}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteItem}
      />
    </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
