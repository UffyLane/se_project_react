import React, { useState, useEffect } from "react";
import "./EditProfileModal.css";

export default function EditProfileModal({
  isOpen,
  onClose,
  user,
  onUpdateUser,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  // Sync modal fields with current user data
  useEffect(() => {
    if (user && isOpen) {
      setName(user.name);
      setAvatar(user.avatar);
    }
  }, [user, isOpen]);

  // Return early if closed or user missing
  if (!isOpen || !user) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("profilemodal__overlay")) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🔥 FIX: App.jsx expects onUpdateUser(name, avatar)
    onUpdateUser={name, avatar}
      .then(() => {
        onClose(); // Close modal on success
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
        // Optionally, show error to user
      });
  };

  return (
    <div className="profilemodal__overlay" onClick={handleOverlayClick}>
      <div
        className="profilemodal__container"
        onClick={(e) => e.stopPropagation()}
      >
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
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="profilemodal__label">
            Avatar <span className="required">*</span>
          </label>
          <input
            className="profilemodal__input"
            type="url"
            placeholder="Link to an avatar image"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          <button className="profilemodal__button" type="submit">
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
}
