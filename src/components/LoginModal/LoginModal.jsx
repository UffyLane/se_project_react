import React, { useState } from "react";
import "./LoginModal.css";
import { loginUser } from "../../utils/api";

function LoginModal({ onClose, switchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    loginUser(email, password)
      .then(() => {
        setErrorMessage("");
        onClose();
        window.location.reload(); // or refetch user/items
      })
      .catch(() => {
        setErrorMessage("Email or password incorrect");
      });
  };

  return (
    <div className="loginmodal__overlay">
      <div className="loginmodal__container">
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

          {/* ERROR MESSAGE */}
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
