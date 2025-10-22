import "./Profile.css";
import SideBar from "../Sidebar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ clothingItems, onCardClick, onAddNewClick, onDeleteItem }) {
  return (
    <div className="profile">
      <SideBar />
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
