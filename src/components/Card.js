function Card({ card, onCardClick }) {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="photo-grid__element">
      <img
        className="photo-grid__photo"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button
        className="photo-grid__trash"
        aria-label="Удалить изображение"
      ></button>
      <div className="photo-grid__info">
        <h2 className="photo-grid__title">{card.name}</h2>
        <div className="photo-grid__like-area">
          <button
            className="photo-grid__like"
            aria-label="Добавить изображение в избранные"
          ></button>
          <p className="photo-grid__like-number">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
