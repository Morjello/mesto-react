import Card from "./Card";

function Main(props) {
  return (
    <main className="main">
      <section className="profile">
        <div
          id="avatar"
          className="profile__image"
          style={{ backgroundImage: `url(${props.userAvatar})` }}
          onClick={props.onEditAvatar}
        />
        <div className="profile__info">
          <div className="profile__cell">
            <h1 className="profile__title" id="profileName">
              {props.userName}
            </h1>
            <button
              type="button"
              className="profile__edit-button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__text" id="about">
            {props.userDescription}
          </p>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <Card card={props.card} onCardClick={props.cardClick} />
    </main>
  );
}

export default Main;
