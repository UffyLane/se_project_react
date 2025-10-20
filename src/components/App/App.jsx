import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
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
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { coordinates, APIkey } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [clothingItems, setClothingItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null); // ✅ added this
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

  // ---- fetch weather + clothes on load ----
  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then(filterWeatherData)
      .then(setWeatherData)
      .catch(console.error);

    fetchClothes()
      .then(setClothingItems)
      .catch(console.error);
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
    if (!itemToDelete?.id) return;

    deleteClothingItem(itemToDelete.id)
      .then(() => {
        // ✅ instantly update UI without refresh
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item.id !== itemToDelete.id)
        );
        handleCloseModals();
      })
      .catch(console.error);
  };

  return (
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
        onDeleteItem={() => handleOpenDeleteConfirm(selectedItem)}
      />

      <ConfirmDeleteModal
        isOpen={isConfirmDeleteOpen}
        onClose={handleCloseModals}
        onConfirm={handleDeleteItem}
      />
    </div>
  );
}

export default App;
