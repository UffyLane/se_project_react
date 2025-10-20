

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} type="button" className="modal__close" />
        <h2 className="modal__title">Are you sure you want to delete this item? This action is irreversible.</h2>
        <div className="modal__actions">
          <button className="modal__submit" onClick={onConfirm}>
            Yes, delete item
          </button>
          <button className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;