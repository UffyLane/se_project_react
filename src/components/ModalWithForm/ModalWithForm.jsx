import "./ModalWithForm.css";


function ModalWithForm({
  children,
  buttonText,
  title,
  onClose,
  isOpen,
  onSubmit,
  isDisabled = false,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isDisabled) {
      onSubmit(e);
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="add-item-modal__close"
          aria-label="Close modal"
        />
        <form className="add-item-modal__form" onSubmit={handleSubmit} noValidate>
          <h2 className="add-item-modal__title">{title}</h2>
          {children}
          <button
            type="submit"
            className="add-item-modal__submit"
            disabled={isDisabled}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
