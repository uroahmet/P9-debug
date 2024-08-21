import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date, de la plus récente à la plus ancienne
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

  // Fonction pour passer à la carte suivante toutes les 5 secondes
  const nextCard = () => {
    setTimeout(() => {
      // Incrémente l'index ou le réinitialise à 0 si l'index dépasse la longueur
      setIndex(index + 1 < byDateDesc?.length ? index + 1 : 0);
    }, 5000);
  };

  useEffect(() => {
    // Lance le changement automatique des cartes
    nextCard();
  }, [index]); // Ajout de l'index comme dépendance pour que le changement de carte soit effectif

  return (
    <div className="SlideCardList">
      {/* Affichage des cartes en fonction de l'index actif */}
      {byDateDesc?.map((event, idx) => (
        <div key={event.date}>
          <div
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}
          >
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* swap des cartes, chaque radio bouton correspondant à une carte */}
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={_.date}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly // Lire seulement pour éviter les erreurs console
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
