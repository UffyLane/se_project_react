// ConfirmDeleteModal.jsx
import "./ConfirmDeleteModal.css";

function ConfirmDeleteModal({ isOpen, onClose, onConfirm }) {
  // modal only renders when open
  if (!isOpen) return null;

  return (
    // modal_opened makes the modal visible
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>

      {/* stops closing when clicking inside box */}
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>

        {/* close (X) button */}
        <button onClick={onClose} type="button" className="modal__close" />

        {/* modal text */}
        <h2 className="modal__title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>

        {/* buttons */}
        <div className="modal__actions">
          {/* confirm delete → calls App.js handleDeleteItem */}
          <button className="modal__submit" onClick={onConfirm}>
            Yes, delete item
          </button>

          {/* cancel */}
          <button className="modal__cancel" onClick={onClose}>
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
}

export default ConfirmDeleteModal;



