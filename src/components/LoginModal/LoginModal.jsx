import React, { useState } from "react";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, switchToSignup, onLogin }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onLogin({ email, password })
      .then(() => {
        setErrorMessage("");
        // App.jsx closes modal automatically
      })
      .catch(() => {
        setErrorMessage("Incorrect email or password");
      });
  };

  return (
    <div className="loginmodal__overlay" onClick={onClose}>
      <div
        className="loginmodal__container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="loginmodal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="loginmodal__title">Log In</h2>

        <form className="loginmodal__form" onSubmit={handleSubmit}>
          <label className="loginmodal__label">Email *</label>
          <input
            className="loginmodal__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="loginmodal__label">Password *</label>
          <input
            className="loginmodal__input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && (
            <p className="loginmodal__error">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="loginmodal__button"
            disabled={!email || !password}
          >
            Log In
          </button>

          <span className="loginmodal__switch" onClick={switchToSignup}>
            or Sign Up
          </span>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;

