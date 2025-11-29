import "./Header.css";
import logo from "../../assets/Logo.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  weatherData,
  openLoginModal,
  openSignupModal,
  onAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

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
        <img
          className="header__logo"
          alt="header logo"
          src={logo}
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />

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

            {/* Avatar + Name — Profile Link */}
            <div
              className="header__profile-link"
              onClick={() => navigate("/profile")}
              style={{ cursor: "pointer" }}
            >
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
            </div>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
