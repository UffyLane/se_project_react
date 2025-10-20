import "./ItemModal.css";

function ItemModal({ isOpen, onClose, item, onDeleteItem }) {
  if (!isOpen || !item) return null;

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
          onClick={onClose}
          type="button"
          className="item-modal__close"
          aria-label="Close modal"
        />
        <img
          src={item.imageUrl || item.link}
          alt={item.name}
          className="item-modal__image"
        />
        <div className="item-modal__footer">
          <div className="item-modal__info">
            <h2 className="item-modal__caption">{item.name}</h2>
            <p className="item-modal__weather">Weather: {item.weather}</p>
          </div>
          <button
            className="item-modal__delete"
            onClick={() => onDeleteItem(item._id)}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
