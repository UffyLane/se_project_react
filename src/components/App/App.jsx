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
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import {
  fetchClothes,
  addClothingItem,
  deleteClothingItem,
  fetchUserInfo,
  updateUserInfo,
} from "../../utils/api";

import { defaultClothingItems } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, ApiKey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Temperature unit toggle
  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((prevUnit) =>
      prevUnit === "F" ? "C" : "F"
    );
  };

  // ESC-close
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") handleCloseModals();
    };

    document.addEventListener("keydown", closeByEscape);
    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  // Load clothing items
  useEffect(() => {
    fetchClothes()
      .then((items) => setClothingItems(items))
      .catch(() => setClothingItems(defaultClothingItems));
  }, []);

  // Load user after login (if token exists)
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    fetchUserInfo()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.error("User fetch failed", err));
  }, []);

  // Load weather
  useEffect(() => {
    const loadWeather = (coords) => {
      getWeather(coords, ApiKey)
        .then(filterWeatherData)
        .then(setWeatherData)
        .catch(console.error);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) =>
          loadWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        () => loadWeather(coordinates)
      );
    } else {
      loadWeather(coordinates);
    }
  }, []);

  // Login / Signup
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

  // Edit profile modal
  const openEditProfileModal = () => setIsEditProfileOpen(true);
  const closeEditProfileModal = () => setIsEditProfileOpen(false);

  // Close ALL modals
  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
    setIsConfirmDeleteOpen(false);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsEditProfileOpen(false);
  };

  // Add item
  const handleAddItem = (newItem) => {
    addClothingItem(newItem)
      .then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
        handleCloseModals();
      })
      .catch(console.error);
  };

  // Card preview
  const handleCardClick = (item) => setSelectedItem(item);

  // Delete
  const handleOpenDeleteConfirm = (item) => {
    setItemToDelete(item);
    setIsConfirmDeleteOpen(true);
  };

  const handleDeleteItem = () => {
    deleteClothingItem(itemToDelete)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((c) => c._id !== itemToDelete._id)
        );
        handleCloseModals();
      })
      .catch(console.error);
  };

  // Update profile
  const handleUpdateUser = (updated) => {
    updateUserInfo(updated)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeEditProfileModal();
      })
      .catch(console.error);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    window.location.href = "/";
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="app">
        <Header
          handleAddClick={() => setIsAddModalOpen(true)}
          weatherData={weatherData || { city: "", temp: { F: 0, C: 0 } }}
          openLoginModal={openLoginModal}
          openSignupModal={openSignupModal}
          user={currentUser}
        />

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
                user={currentUser}
                clothingItems={clothingItems}
                onCardClick={handleCardClick}
                onDeleteItem={handleOpenDeleteConfirm}
                onAddNewClick={() => setIsAddModalOpen(true)}
                onEditProfile={openEditProfileModal}
                onLogout={handleLogout}
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

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          switchToSignup={openSignupModal}
        />

        <SignupModal
          isOpen={isSignupModalOpen}
          onClose={closeSignupModal}
          switchToLogin={openLoginModal}
        />

        <EditProfileModal
          isOpen={isEditProfileOpen}
          onClose={closeEditProfileModal}
          user={currentUser}
          onUpdateUser={handleUpdateUser}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
