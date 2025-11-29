import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,     // <-- REQUIRED for like feature
  onDeleteItem,
  onAddNewClick
}) {
  const currentUser = useContext(CurrentUserContext);

  // 🔥 Show ONLY the user's own items
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button
          type="button"
          className="clothes-section__add-btn"
          onClick={onAddNewClick}
        >
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {userItems.length > 0 ? (
          userItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={onCardClick}
              onCardLike={onCardLike}     // <-- MUST pass for like button
              onDeleteItem={onDeleteItem}
              variant="profile"
            />
          ))
        ) : (
          <p className="clothes-section__no-items">No items added yet.</p>
        )}
      </ul>
    </section>
  );
}
