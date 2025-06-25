import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/avatar.svg";
import { useState } from "react";

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
      <img className="header__logo" src={logo} />
      <button className={`mobile__user-container ${isMobileMenuOpened ? "mobile__user-container_opened" : ""}`} onClick={handleMobileClick}>
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
        <button
          onClick={handleAddClick}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
