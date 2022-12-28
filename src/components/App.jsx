import React from "react";
import { useEffect, useState } from "react";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";

function App() {
  // стейт попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  // стейт данных пользователя
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  // стейт карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  //открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  }

  // передача данных карточки
  function handleCardClick(card) {
    setSelectedCard(...card);
  }

  // получение данных пользователя
  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Ошибка загрузки данныХ пользователя", err);
      });
  }, []);

  return (
    <body className="root">
      <Header />
      <Main
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        userName={userName}
        userDescription={userDescription}
        userAvatar={userAvatar}
        card={cards}
        cardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <PopupWithForm
        id="1"
        title="Редактировать профиль"
        name="profile"
        button="Сохранить"
        isOpen={isEditProfilePopupOpen && "popup_opened"}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            type="text"
            className="popup__input"
            placeholder="Ваше имя"
            id="name"
            name="name"
            value=""
            minLength="2"
            maxLength="40"
            required
          />
          <span className="popup__error name-error"></span>
        </label>
        <label className="popup__label">
          <input
            type="text"
            className="popup__input"
            placeholder="Род деятельности"
            id="bio"
            name="bio"
            value=""
            minLength="2"
            maxLength="200"
            required
          />
          <span className="popup__error bio-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm
        id="2"
        title="Новое место"
        name="add"
        button="Создать"
        isOpen={isAddPlacePopupOpen && "popup_opened"}
        onClose={closeAllPopups}
      >
        <label className="popup__label">
          <input
            type="text"
            className="popup__input"
            id="title"
            name="title"
            value=""
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
          />
          <span className="popup__error title-error"></span>
        </label>
        <label className="popup__label">
          <input
            type="url"
            className="popup__input"
            id="link"
            name="link"
            value=""
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error link-error"></span>
        </label>
      </PopupWithForm>
      <PopupWithForm id="3" title="Вы уверены?" name="delete" button="Да" />
      <PopupWithForm
        id="4"
        title="Обновить аватар"
        name="avatar"
        button="Сохранить"
        isOpen={isEditAvatarPopupOpen && "popup_opened"}
        onClose={closeAllPopups}
      >
        <lable className="popup__label">
          <input
            type="url"
            className="popup__input"
            id="avatar-link"
            name="avatar-link"
            value=""
            placeholder="Ссылка на картинку"
            required
          />
          <span className="popup__error avatar-link-error"></span>
        </lable>
      </PopupWithForm>
    </body>
  );
}

export default App;
