import "./Profile.css";
import SideBar from "../Sidebar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  user,
  clothingItems,
  onCardClick,
  onAddNewClick,
  onDeleteItem,
  onEditProfile,
  onCardLike,
  onLogout,
}) {
  return (
    <div className="profile">
      <SideBar
        user={user}
        onEditProfile={onEditProfile}
        onLogout={onLogout}
      />

      <ClothesSection
        clothingItems={clothingItems}
        onCardClick={onCardClick}
        onAddNewClick={onAddNewClick}
        onDeleteItem={onDeleteItem}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
