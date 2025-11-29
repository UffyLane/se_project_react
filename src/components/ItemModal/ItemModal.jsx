import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ isOpen, onClose, item, onDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  if (!isOpen || !item) return null;

  const isOwn = currentUser && item.owner === currentUser._id;

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose}>
          ×
        </button>

        <img src={item.imageUrl} alt={item.name} className="modal__image" />
        <div className="modal__info">
          <h2 className="modal__title">{item.name}</h2>
          <p className="modal__weather">Weather: {item.weather}</p>

          {/* 🔥 Only owner sees delete button */}
          {isOwn && (
            <button
              className="modal__delete-button"
              onClick={() => onDeleteItem(item)}
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

