function PopupWithForm(props) {
  return (
    <div className="root__wrapper">
      <div className={`popup popup-${props.name} ${props.isOpen}`}>
        <div className="popup__container">
          <h2 className="popup__title">{props.title}</h2>
          <form
            className="popup__form profile-popup__form"
            name={props.name}
            id={props.id}
            noValidate
          >
            {props.children}
            <button className="popup__button" type="submit">
              {props.button}
            </button>
          </form>
          <button
            type="button"
            className="popup__close"
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;
