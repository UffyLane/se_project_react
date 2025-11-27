import React, { useState } from "react";
import "./EditProfileModal.css";
import { updateUserInfo } from "../../utils/api";

function EditProfileModal({ user, onClose, onUpdate }) {
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    updateUserInfo({ name, avatar })
      .then((updatedUser) => {
        onUpdate(updatedUser);
        onClose();
      })
      .catch(() => {
        setError("Failed to update profile");
      });
  };

  return (
    <div className="profilemodal__overlay">
      <div className="profilemodal__container">
        <button className="profilemodal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="profilemodal__title">Change profile data</h2>

        <form className="profilemodal__form" onSubmit={handleSubmit}>
          <label className="profilemodal__label">
            Name <span className="required">*</span>
          </label>
          <input
            className="profilemodal__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="profilemodal__label">
            Avatar <span className="required">*</span>
          </label>
          <input
            className="profilemodal__input"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          {error && <p className="profilemodal__error">{error}</p>}

          <button type="submit" className="profilemodal__button">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfileModal;
