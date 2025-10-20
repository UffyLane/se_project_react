import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { useState } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const handleMobileClick = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
  <img className="header__logo" alt="head-logo" src={logo} />
</NavLink>

      <button
        className={`mobile__user-container ${
          isMobileMenuOpened ? "mobile__user-container_opened" : ""
        }`}
        onClick={handleMobileClick}
      >
        {isMobileMenuOpened ? (
          ``
        ) : (
          <div>
            <div className="header-mobile__menu-1"></div>
            <div className="header-mobile__menu-2"></div>
          </div>
        )}
      </button>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <div
        className={`mobile-menu ${
          isMobileMenuOpened ? "mobile-menu_opened" : ""
        }`}
      >

      
        
        
        <div className="header__mobile-content">
        
          <ToggleSwitch/>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>
          
          <NavLink className="header__profile-link" to="/profile">
            <p className="header__username">Terrence Tegegne</p>
            <img
              src={avatar}
              alt="Terrence Tegegne"
              className="header__avatar"
            />

          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
