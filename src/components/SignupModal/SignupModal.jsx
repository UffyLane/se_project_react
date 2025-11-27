import React, { useState } from "react";
import "./SignupModal.css";
import { signupUser } from "../../utils/api";

function SignupModal({ isOpen, onClose, switchToLogin }) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    signupUser({ name, avatar, email, password })
      .then(() => {
        setErrorMessage("");
        onClose();
        switchToLogin(); 
      })
      .catch(() => {
        setErrorMessage("Could not create account");
      });
  };

  return (
    <div className="signupmodal__overlay" onClick={onClose}>
      <div
        className="signupmodal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="signupmodal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="signupmodal__title">Sign Up</h2>

        <form className="signupmodal__form" onSubmit={handleSubmit}>
          <label className="signupmodal__label">Name *</label>
          <input
            className="signupmodal__input"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="signupmodal__label">Avatar *</label>
          <input
            className="signupmodal__input"
            type="url"
            placeholder="Link to an image"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            required
          />

          <label className="signupmodal__label">Email *</label>
          <input
            className="signupmodal__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="signupmodal__label">Password *</label>
          <input
            className="signupmodal__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="signupmodal__error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="signupmodal__button"
            disabled={!name || !avatar || !email || !password}
          >
            Create Account
          </button>

          <span className="signupmodal__switch" onClick={switchToLogin}>
            or Log In
          </span>
        </form>
      </div>
    </div>
  );
}

export default SignupModal;
