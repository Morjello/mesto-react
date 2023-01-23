import React from "react";
import { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import CardContext from "../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";

function App() {
  // стейт попапов
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isDeletePlacePopupOpen, setIsDeletePlacePopupOpen] = useState(false);
  // стейт данных пользователя
  const [currentUser, setCurrentUser] = useState({});
  // стейт карточек
  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  //стейт карточки
  const [cardData, setCardData] = useState("");

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

  function handleDeletePlaceClick() {
    setIsDeletePlacePopupOpen(true);
  }

  // закрытие попапов
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePlacePopupOpen(false);
    setSelectedCard(null);
  }

  // передача данных карточки
  function handleCardClick(card) {
    setSelectedCard(...card);
  }

  // поставить убрать лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    if (!isLiked) {
      api
        .putLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Ошибка добавления лайка", err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log("Ошибка удаления лайка", err);
        });
    }
  }

  // обновление данных пользователя
  function handleUpdateUser({ name, about }) {
    api
      .editProfileInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления данныХ пользователя", err);
      });
  }

  // обновление аватара
  function handleUpdateAvatar({ avatar }) {
    api
      .editUserAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка обновления аватара", err);
      });
  }

  // добавление новой карточки
  function handleAddPlaceSubmit({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((cardData) => {
        setCards([cardData, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка добавления новой карточки", err);
      });
  }

  function handleSetCard(cardData) {
    setCardData(cardData);
  }

  // удаление карточки
  function handleDeletePlaceSubmit(card) {
    api
      .deleteCard(card._id)
      .then((del) => {
        setCards((state) => state.filter((d) => d._id !== card._id && del));
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Ошибка удаления карточки", err);
      });
  }

  // получение данных пользователя
  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log("Ошибка загрузки данныХ пользователя", err);
      });
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardContext.Provider value={cards}>
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onDeletePlace={handleDeletePlaceClick}
          setCard={handleSetCard}
          cardClick={handleCardClick}
          cardLike={handleCardLike}
        />
        <Footer />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddPlaceSubmit}
        />
        <DeletePlacePopup
          isOpen={isDeletePlacePopupOpen}
          onClose={closeAllPopups}
          onDeleteCard={handleDeletePlaceSubmit}
          cardData={cardData}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
      </CardContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
