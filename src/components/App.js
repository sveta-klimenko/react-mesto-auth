import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
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

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser || defaultCurrentUser}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <PopupWithForm
          name="add-picture"
          title="Новое место"
          submit="Сохранить"
          children={
            <>
              <label className="error-label">
                <input
                  type="text"
                  className="info info_place-name"
                  id="place-name"
                  name="name"
                  placeholder="Название"
                  required
                  minLength="2"
                  maxLength="30"
                />
                <span className="error" id="place-name-error"></span>
              </label>
              <label className="error-label">
                <input
                  type="url"
                  className="info info_place-link"
                  id="place-link"
                  name="link"
                  placeholder="Ссылка на картинку"
                  required
                />
                <span className="error" id="place-link-error"></span>
              </label>
            </>
          }
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          name="change-icon"
          title="Закрыть попап"
          submit="Сохранить"
          children={
            <label className="error-label">
              <input
                type="url"
                className="info info_icon"
                id="avatar"
                name="avatar"
                placeholder="Ссылка на аватар"
                required
              />
              <span className="error" id="avatar-error"></span>
            </label>
          }
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
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
