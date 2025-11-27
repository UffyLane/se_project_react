import React, { useState } from "react";
import "./LoginModal.css";
import { loginUser } from "../../utils/api";

function LoginModal({ isOpen, onClose, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 🔥 Don’t render if closed
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("loginmodal__overlay")) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setErrorMessage("");
        onClose();
        window.location.reload(); // refresh UI
      })
      .catch(() => {
        setErrorMessage("Email or password incorrect");
      });
  };

  return (
    <div className="loginmodal__overlay" onClick={handleOverlayClick}>
      <div
        className="loginmodal__container"
        onClick={(e) => e.stopPropagation()}  // 🔥 prevents accidental closing
      >
        <button className="loginmodal__close" onClick={onClose}>
          ×
        </button>

        <h2 className="loginmodal__title">Log In</h2>

        <form className="loginmodal__form" onSubmit={handleSubmit}>
          <label className="loginmodal__label">Email</label>
          <input
            className="loginmodal__input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="loginmodal__label">Password</label>
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
