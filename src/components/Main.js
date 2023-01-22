import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";
import { useContext } from "react";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardDelete,
  cardClick,
  cardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          id="avatar"
          className="profile__image"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}
          onClick={onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__cell">
            <h1 className="profile__title" id="profileName">
              {currentUser.name}
            </h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__text" id="about">
            {currentUser.about}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
        ></button>
      </section>
      <Card
        onCardClick={cardClick}
        onCardLike={cardLike}
        currentUser={currentUser}
        onCardDelete={onCardDelete}
      />
    </main>
  );
}

export default Main;
