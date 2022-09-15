import React from "react";
import base_icon from "../images/base_icon.jpg";
import api from "../utils/api";
import Card from "./Card";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
  const [userName, setUserName] = React.useState("Загрузка...");
  const [userDescription, setUserDescription] = React.useState("Загрузка...");
  const [userAvatar, setUserAvatar] = React.useState(base_icon);
  const [cards, setCards] = React.useState([]);

  const getStartInfoApi = () => {
    Promise.all([api.getCards(), api.getPersonalInfo()])
      .then((res) => {
        const [cardData, PersonalInfoData] = res;
        //myId = PersonalInfoData._id;
        setUserName(PersonalInfoData.name);
        setUserDescription(PersonalInfoData.about);
        setUserAvatar(PersonalInfoData.avatar);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  };

  getStartInfoApi();

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__info">
          <button
            className="profile__avatar-edit"
            onClick={onEditAvatar}
          ></button>
          <img
            src={userAvatar}
            className="profile__avatar"
            alt="Аватар пользователя"
          />
          <div className="profile__id">
            <h1 className="profile__name">{userName}</h1>
            <p className="profile__occupation">{userDescription}</p>
          </div>
          <button
            className="profile__change-info"
            aria-label="Сменить информацию в профиле"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="profile__add-picture"
          aria-label="Добавить фотографию"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="photos">
        <ul className="photo-grid">
          {cards.map((item) => {
            return (
              <Card key={item._id} card={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
