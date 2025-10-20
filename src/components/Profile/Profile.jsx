import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClick, onAddNewClick, onDeleteItem }) {
  return (
    <div className="profile">
      <Sidebar />
      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddNewClick={onAddNewClick}
        onDeleteItem={onDeleteItem}
      />
    </div>
  );
}

export default Profile;
