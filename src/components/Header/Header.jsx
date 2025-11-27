import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ weatherData, openLoginModal, openSignupModal }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const token = localStorage.getItem("jwt");
  const isLoggedIn = !!token;

  return (
    <header className="header">

      {/* LEFT SIDE (Logo + Date) */}
      <div className="header__left">
        <NavLink to="/" className="header__logo-link">
          <img className="header__logo" alt="head-logo" src={logo} />
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData.city}
        </p>
      </div>

      {/* RIGHT SIDE (toggle + auth links) */}
      <div className="header__right">
        <ToggleSwitch />

        {!isLoggedIn ? (
          <>
            <button className="header__signup-btn" onClick={openSignupModal}>
              Sign Up
            </button>

            <button className="header__login-btn" onClick={openLoginModal}>
              Log In
            </button>
          </>
        ) : (
          <NavLink className="header__profile-link" to="/profile">
            <p className="header__username">Terrence Tegegne</p>
            <img src={avatar} className="header__avatar" alt="avatar" />
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
