import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({ clothingItems, onCardClick, onDeleteItem }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2 className="clothes-section__title">Your items</h2>
        <button type="button" className="clothes-section__add-btn">
          + Add new
        </button>
      </div>

      <ul className="clothes-section__list">
        {clothingItems.length > 0 ? (
          clothingItems.map((item, index) => (
            <ItemCard
              key={item._id || item.id || `profile-item-${index}`}   
              item={item}
              onCardClick={onCardClick}
              onDeleteItem={onDeleteItem}
              variant="profile"
            />
          ))
        ) : (<p className="clothes-section__no-items">No items added yet.</p>
        )}
      </ul>
    </section>
  );
}
