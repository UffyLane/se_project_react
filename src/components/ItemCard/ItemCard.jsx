import "./ItemCard.css";

function ItemCard({ item, onCardClick, onDeleteItem }) {
  return (
    <li className="card">
      <img
        src={item.link || item.imageUrl}
        alt={item.name}
        className="card__image"
        onClick={() => onCardClick(item)}
      />
      <div className="card__footer">
        <p className="card__name">{item.name}</p>
       
      </div>
    </li>
  );
}

export default ItemCard;
