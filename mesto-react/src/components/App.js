import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import PopupWithForm from "./components/PopupWithForm";
import ImagePopup from "./components/ImagePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

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
  }

  return (
    <body className="page">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <PopupWithForm
        name="personal-info"
        title="Редактировать профиль"
        submit="Сохранить"
        children={
          <>
            <label className="error-label">
              <input
                type="text"
                className="info info_name"
                id="name"
                name="name"
                required
                minlength="2"
                maxlength="40"
              />
              <span className="error" id="name-error"></span>
            </label>
            <label className="error-label">
              <input
                type="text"
                className="info info_description"
                id="description"
                name="about"
                required
                minlength="2"
                maxlength="200"
              />
              <span className="error" id="description-error"></span>
            </label>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
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
                minlength="2"
                maxlength="30"
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
    </body>
  );
}

export default App;
