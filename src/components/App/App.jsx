import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./App.css";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";

import AddItemModal from "../AddItemModal/AddItemModal";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import {
  fetchClothes,
  addClothingItem,
  deleteClothingItem,
  getCurrentUser,
  updateUserInfo,
  loginUser,
  signupUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

import { defaultClothingItems } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, ApiKey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [user, setUser] = useState(null);
  const isLoggedIn = !!user;

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // AUTH
  const handleRegister = ({ name, avatar, email, password }) => {
    return signupUser({ name, avatar, email, password })
      .then(() => loginUser(email, password))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser();
      })
      .then((userData) => {
        setUser(userData);
        setIsSignupModalOpen(false);
      })
      .catch(console.error);
  };

  const handleLogin = ({ email, password }) => {
    return loginUser(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return getCurrentUser();
      })
      .then((userData) => {
        setUser(userData);
        setIsLoginModalOpen(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) return;

    getCurrentUser()
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("jwt");
        setUser(null);
      });
  }, []);

  // WEATHER
  useEffect(() => {
    const loadWeather = (coords) => {
      getWeather(coords, ApiKey)
        .then(filterWeatherData)
        .then(setWeatherData)
        .catch(console.error);
    };

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        loadWeather({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      () => loadWeather(coordinates)
    );
  }, []);

  // CLOTHING
  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setClothingItems(defaultClothingItems);
      return;
    }

    fetchClothes()
      .then(setClothingItems)
      .catch(() => setClothingItems([]));
  }, [isLoggedIn]);

  const handleToggleSwitchChange = () =>
    setCurrentTemperatureUnit((prev) => (prev === "F" ? "C" : "F"));

  const handleCardLike = ({ _id, likes }) => {
    if (!user) return;

    const isLiked = likes.some((id) => id === user._id);
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(_id)
      .then((updatedItem) => {
        setClothingItems((prev) =>
          prev.map((item) => (item._id === _id ? updatedItem : item))
        );
      })
      .catch(console.error);
  };

  const handleAddItem = (newItem) => {
    if (!isLoggedIn) return;

    addClothingItem(newItem)
      .then((saved) => {
        setClothingItems((prev) => [saved, ...prev]);
        handleCloseModals();
      })
      .catch(console.error);
  };

  // DELETE (FULLY FIXED)
  const handleDeleteItem = () => {
    if (!itemToDelete) return;

    const deleteId = itemToDelete._id || itemToDelete.id;

    deleteClothingItem(deleteId)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => {
            const itemId = item._id || item.id;
            return itemId !== deleteId;
          })
        );
        handleCloseModals();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setUser(null);
    window.location.href = "/";
  };

  const handleCloseModals = () => {
    setIsAddModalOpen(false);
    setIsConfirmDeleteOpen(false);
    setSelectedItem(null);
    setItemToDelete(null);
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(false);
    setIsEditProfileOpen(false);
  };

  const safeWeather =
    weatherData || { city: "", temp: { F: 0, C: 0 }, type: "warm" };

  return (
    <CurrentUserContext.Provider value={user}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="app">
          <Header
            user={user}
            weatherData={safeWeather}
            openLoginModal={() => setIsLoginModalOpen(true)}
            openSignupModal={() => setIsSignupModalOpen(true)}
            onAddClick={() => setIsAddModalOpen(true)}
          />

          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={safeWeather}
                  clothingItems={clothingItems}
                  handleCardClick={setSelectedItem}
                  onCardLike={handleCardLike}
                  onDeleteItem={(item) => {
                    setItemToDelete(item);
                    setIsConfirmDeleteOpen(true);
                  }}
                  isLoggedIn={isLoggedIn}
                />
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute user={user}>
                  <Profile
                    user={user}
                    clothingItems={clothingItems}
                    onCardClick={setSelectedItem}
                    onDeleteItem={(item) => {
                      setItemToDelete(item);
                      setIsConfirmDeleteOpen(true);
                    }}
                    onAddNewClick={() => setIsAddModalOpen(true)}
                    onEditProfile={() => setIsEditProfileOpen(true)}
                    onLogout={handleLogout}
                    onCardLike={handleCardLike}
                  />
                </ProtectedRoute>
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
            onDeleteItem={(item) => {
              setItemToDelete(item);
              setIsConfirmDeleteOpen(true);
            }}
          />

          <ConfirmDeleteModal
            isOpen={isConfirmDeleteOpen}
            onClose={handleCloseModals}
            onConfirm={handleDeleteItem}
          />

          <LoginModal
            isOpen={isLoginModalOpen}
            onClose={() => setIsLoginModalOpen(false)}
            switchToSignup={() => {
              setIsSignupModalOpen(true);
              setIsLoginModalOpen(false);
            }}
            onLogin={handleLogin}
          />

          <RegisterModal
            isOpen={isSignupModalOpen}
            onClose={() => setIsSignupModalOpen(false)}
            switchToLogin={() => {
              setIsLoginModalOpen(true);
              setIsSignupModalOpen(false);
            }}
            onRegister={handleRegister}
          />

          <EditProfileModal
            isOpen={isEditProfileOpen}
            onClose={handleCloseModals}
            user={user}
            onUpdateUser={updateUserInfo}
          />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

