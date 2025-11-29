import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";



export default function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const isLiked =
    isLoggedIn &&
    item.likes &&
    item.likes.includes(currentUser._id);

  // class for button
  const likeButtonClass = isLiked
    ? "card__like-btn card__like-btn_liked"
    : "card__like-btn";

  const handleLike = () => {
    if (!isLoggedIn) return;
    onCardLike(item);
  };

  return (
    <div className="card">

      {/* --- LABEL + HEART WRAPPER (FLOATS OVER IMAGE) --- */}
      <div className="card__name-wrapper">
        <span className="card__name">{item.name}</span>

        {isLoggedIn && (
          <button
            className={likeButtonClass}
            onClick={handleLike}
            aria-label="like"
          ></button>
        )}
      </div>

      {/* --- MAIN ITEM IMAGE --- */}
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={() => onCardClick(item)}
      />
    </div>
  );
}
