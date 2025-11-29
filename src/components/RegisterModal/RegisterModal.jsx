import React, { useState } from "react";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, switchToLogin, onRegister }) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister({ name, avatar, email, password })
      .then(() => setErrorMessage(""))
      .catch(() => setErrorMessage("Could not create account"));
  };

  return (
    <div className="registermodal__overlay" onClick={onClose}>
      <div
        className="registermodal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="registermodal__close" onClick={onClose} />

        <h2 className="registermodal__title">Sign Up</h2>

        <form className="registermodal__form" onSubmit={handleSubmit}>
          
          <label className="registermodal__label">Email*</label>
          <input
            className="registermodal__input"
            type="email"
            placeholder="youremail@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="registermodal__label">Password*</label>
          <input
            className="registermodal__input"
            type="password"
            placeholder="****************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label className="registermodal__label">Name*</label>
          <input
            className="registermodal__input"
            type="text"
            placeholder="Terrence Tegegne"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="registermodal__label">Avatar URL*</label>
          <input
            className="registermodal__input"
            type="url"
            placeholder="https://media.istockphoto.com/vectors/user-icon-flat..."
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="registermodal__error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="registermodal__button"
            disabled={!name || !avatar || !email || !password}
          >
            Sign Up
          </button>

          <span className="registermodal__switch" onClick={switchToLogin}>
            or Log In
          </span>
        </form>
      </div>
    </div>
  );
}

export default RegisterModal;



