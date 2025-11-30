import React, { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function ItemCard({
  item,
  onCardClick,
  onCardLike,
  onDeleteItem,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  const isLiked =
    isLoggedIn &&
    Array.isArray(item.likes) &&
    item.likes.includes(currentUser._id);

  const likeButtonClass = isLiked
    ? "card__like-btn card__like-btn_liked"
    : "card__like-btn";

  const handleLike = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) return;
    onCardLike(item);
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <div className="card__name-wrapper">
        <span className="card__name">{item.name}</span>

        {isLoggedIn && (
          <button
            className={likeButtonClass}
            onClick={handleLike}
            aria-label="like"
          />
        )}
      </div>

      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}
