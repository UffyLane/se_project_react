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

import LoginModal from "../LoginModal/LoginModal";
import SignupModal from "../SignupModal/SignupModal";

import {
  fetchClothes,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api";

import { defaultClothingItems } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, ApiKey } from "../../utils/constants";


function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // ---- Toggle Switch ----
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) =>
      prevUnit === "F" ? "C" : "F"
    );
  };

  // ---- ESC to close ----
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") handleCloseModals();
    };

    document.addEventListener("keydown", closeByEscape);
    return () =>
      document.removeEventListener("keydown", closeByEscape);
  }, []);

  // ---- Fetch Clothes ----
  useEffect(() => {
    fetchClothes()
      .then((items) => setClothingItems(items))
      .catch((err) => {
        console.warn(err);
        setClothingItems(defaultClothingItems);
      });
  }, []);

  // ---- Weather ----
  useEffect(() => {
    const loadWeather = (coords) => {
      getWeather(coords, ApiKey)
        .then(filterWeatherData)
        .then(setWeatherData)
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.warn(
            `Geolocation error (${error.code}): ${error.message}. Using default coordinates.`
          );
          loadWeather(coordinates);
        }
      );
    } else {
      loadWeather(coordinates);
    }
  }, []);

  // ---- Login / Signup ----
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
    setIsSignupModalOpen(false);
  };

  const openSignupModal = () => {
    setIsSignupModalOpen(true);
    setIsLoginModalOpen(false);
  };

  const closeLoginModal = () => setIsLoginModalOpen(false);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  // ---- Modal Controls ----
  const handleAddClick = () => setIsAddModalOpen(true);

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
    setIsConfirmDeleteOpen(false);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
  };

  // ---- Add Clothing Item ----
  const handleAddItem = (newItem) => {
    addClothingItem(newItem)
      .then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
        handleCloseModals();
      })
      .catch(console.error);
  };

  // ---- Item Card Click ----
  const handleCardClick = (item) => setSelectedItem(item);

  // ---- Delete ----
  const handleOpenDeleteConfirm = (item) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteItem = () => {
    deleteClothingItem(itemToDelete)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete._id)
        );
        handleCloseModals();
      })
      .catch(console.error);
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">

        {/* HEADER */}
        <Header
          handleAddClick={handleAddClick}
          weatherData={weatherData || { city: "", temp: { F: 0, C: 0 } }}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
        />

        {/* ROUTES */}
        <Routes>
          <Route
            path="/"
            element={
              <Main
                weatherData={
                  weatherData || {
                    city: "",
                    temp: { F: 0, C: 0 },
                    type: "hot",
                  }
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

        {/* FOOTER */}
        <Footer />

        {/* ADD ITEM */}
        <AddItemModal
          isOpen={isAddModalOpen}
          onClose={handleCloseModals}
          onSubmit={handleAddItem}
        />

        {/* ITEM PREVIEW MODAL */}
        <ItemModal
          isOpen={!!selectedItem}
          onClose={handleCloseModals}
          item={selectedItem}
          onDeleteItem={handleOpenDeleteConfirm}
        />

        {/* CONFIRM DELETE */}
        <ConfirmDeleteModal
          isOpen={isConfirmDeleteOpen}
          onClose={handleCloseModals}
          onConfirm={handleDeleteItem}
        />

        {/* LOGIN */}
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          switchToSignup={openSignupModal}
        />

        {/* SIGNUP */}
        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          switchToLogin={openLoginModal}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
