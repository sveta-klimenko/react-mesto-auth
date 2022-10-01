import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./Popup/ImagePopup";
import EditProfilePopup from "./Popup/EditProfilePopup";
import EditAvatarPopup from "./Popup/EditAvatarPopup";
import AddPlacePopup from "./Popup/AddPlacePopup";
import {
  defaultCurrentUser,
  CurrentUserContext,
} from "../contexts/CurrentUserContext";
import api from "../utils/api";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => c._id != card._id));
    });
  }

  useEffect(() => {
    api
      .getPersonalInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api
      .updatePersonalInfo(data)
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    console.log("hello");
    api
      .createCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.log(err));
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser || defaultCurrentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup
          link={selectedCard.link}
          title={selectedCard.name}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
