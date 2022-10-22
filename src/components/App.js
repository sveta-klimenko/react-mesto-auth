import React, { useState, useEffect } from "react";
import { Route, Routes, Redirect, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ImagePopup from "./Popup/ImagePopup";
import EditProfilePopup from "./Popup/EditProfilePopup";
import EditAvatarPopup from "./Popup/EditAvatarPopup";
import AddPlacePopup from "./Popup/AddPlacePopup";
import InfoTooltip from "./Popup/InfoTooltip";
import {
  defaultCurrentUser,
  CurrentUserContext,
} from "../contexts/CurrentUserContext";
import api from "../utils/api";
import * as apiAuth from "../utils/apiAuth";
import { ProtectedRoute } from "./ProtectedRoute";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isRegSuccess, setIsRegSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [redirectTitle, setRedirectTitle] = useState("default name");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getCards()
      .then((cardData) => {
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const path = window.location.pathname;
    if (path == "/sign-up") {
      setRedirectTitle("Войти");
    }
    if (path == "/sign-in") {
      setRedirectTitle("Зарегистрироваться");
    }
    if (path == "/") {
      setRedirectTitle("Выйти");
    }
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }
    apiAuth
      .checkToken(token)
      .then((res) => {
        setEmail(res.data.email);
        setIsLoggedIn(true);
        navigate("/");
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id != card._id));
      })
      .catch((err) => console.log(err));
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
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api
      .updatePersonalInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleRegistration(email, password) {
    if (!email || !password) return;
    apiAuth
      .register(email, password)
      .then((res) => {
        if (res) {
          setIsRegSuccess(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsRegSuccess(false);
      })
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(email, password) {
    if (!email || !password) return;
    apiAuth
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        apiAuth.checkToken(res.token).then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleHeaderButtonClick() {
    const path = window.location.pathname;
    if (path == "/sign-up") {
      navigate("/sign-in");
    }
    if (path == "/sign-in") {
      navigate("/sign-up");
    }
    if (path == "/") {
      localStorage.removeItem("jwt");
      setEmail("");
      navigate("/sign-in");
      setIsLoggedIn(false);
    }
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser || defaultCurrentUser}>
        <Header
          email={email}
          onClick={handleHeaderButtonClick}
          redirectTitle={redirectTitle}
        />
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Register
                onSubmit={handleRegistration}
                submit="Зарегестрироваться"
                title="Регистрация"
                redirectLink="/sign-in"
              />
            }
          />
          <Route
            path="/sign-in"
            element={
              <Login onSubmit={handleLogin} submit="Войти" title="Вход" />
            }
          />
          <Route
            exact
            path="/"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />

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
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
        <Footer />
        <InfoTooltip
          name="infoTooltip"
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isRegSuccess={isRegSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
