function Card(props) {

    function handleClick() {
        props.onCardClick(props.card);
      };

    return (
        <section className="cards">
            <ul className="cards__table">
            {props.card.map((card, _id) => {
                return (
                    <li className="cards__card" key={card._id}>
                    <button type="button" className="cards__delete"></button>
                    <button className="cards__image-button">
                        <div className="cards__image" style={{ backgroundImage: `url(${card.link})`}} onClick={handleClick} />
                    </button>
                    <div className="cards__cell">
                        <h2 className="cards__text">{card.name}</h2>
                        <div className="cards__container">
                            <button type="button" className="cards__heart"></button>
                             <p className="cards__likes">{card.likes.length}</p>
                        </div>
                    </div>
                    </li>
                )
            })
            }
            </ul>
        </section>
    );
}

export default Card