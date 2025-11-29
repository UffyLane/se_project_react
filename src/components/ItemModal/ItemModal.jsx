import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, item, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);
  if (!item || !isOpen) return null;

  // FIXED: owner check (handles both string and object)
  const isOwn =
    currentUser &&
    (item.owner === currentUser._id ||
      item.owner?._id === currentUser._id);

  return (
    <div
      className={`item-modal ${isOpen ? "item-modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="item-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="item-modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close"
        />

        <img
          className="item-modal__image"
          src={item.imageUrl}
          alt={item.name}
        />

        <div className="item-modal__footer">
          <div className="item-modal__info">
            <h2 className="item-modal__caption">{item.name}</h2>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>

          {isOwn && (
            <button
              className="item-modal__delete"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteItem(item); // opens ConfirmDeleteModal
              }}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;








