import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { NavLink } from "react-router-dom";   // ✅ REQUIRED
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  openLoginModal,
  openSignupModal,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isLoggedIn = !!currentUser;

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name
    ? currentUser.name.charAt(0).toUpperCase()
    : "?";

  return (
    <header className="header">
      {/* LEFT SIDE — Logo + Date/Location */}
      <div className="header__left">

        {/* ✅ REQUIRED LINK TO "/" */}
        <NavLink to="/" className="header__logo-link">
          <img
            className="header__logo"
            alt="header logo"
            src={logo}
          />
        </NavLink>

        <p className="header__date-and-location">
          {currentDate}, {weatherData?.city || ""}
        </p>
      </div>

      {/* RIGHT SIDE — Toggle + Auth/Login/Avatar */}
      <div className="header__right">
        <ToggleSwitch />

        {/* NOT LOGGED IN */}
        {!isLoggedIn && (
          <>
            <button
              className="header__login-btn"
              onClick={openLoginModal}
            >
              Log In
            </button>

            <button
              className="header__signup-btn"
              onClick={openSignupModal}
            >
              Sign Up
            </button>
          </>
        )}

        {/* LOGGED IN */}
        {isLoggedIn && (
          <>
            <button
              className="header__add-clothes-btn"
              onClick={onAddClick}
            >
              + Add Clothes
            </button>

            {/* ✅ REQUIRED LINK TO "/profile" */}
            <NavLink to="/profile" className="header__profile-link">
              {currentUser.avatar ? (
                <img
                  src={currentUser.avatar}
                  alt="avatar"
                  className="header__avatar"
                />
              ) : (
                <div className="header__avatar-placeholder">
                  {userInitial}
                </div>
              )}

              <p className="header__username">{currentUser.name}</p>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

