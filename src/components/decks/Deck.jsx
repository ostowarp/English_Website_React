// import icons:
import watch from "../../assets/icons/watch.svg";
import cards from "../../assets/icons/cards.svg";
import FlagIcon from "react-world-flags";

// import style:
import styles from "../../Style/decks/Deck.module.css";

// import components:
import { CircleGraph, LineGraph, BlackButton } from "../";

import { useLocation } from "react-router-dom";

// import languages:
import { languages } from "../../contexts/data";

const getFlagByLabel = (label) => {
  const language = languages.find(
    (lang) => lang.label.toLowerCase() === label.toLowerCase()
  );
  return language ? language.flag : "unknown";
};

export default function Deck({
  id,
  language,
  name = "New deck",
  description = "Taken from Lucy Movie",
  time,
  numcards = 0,
  percent = 0,
  colrow = 0,
}) {
  const flag = getFlagByLabel(language);
  const location = useLocation();
  const page = location.pathname ? location.pathname : "/dashboard";
  return (
    <div
      className={
        (page == "/decks" && !colrow) || page == "/dashboard"
          ? styles.deck
          : styles.deck2
      }
    >
      <div
        className={
          (page == "/decks" && !colrow) || page == "/dashboard"
            ? styles.bigimage
            : styles.bigimage2
        }
      >
        <FlagIcon
          className={
            (page == "/decks" && !colrow) || page == "/dashboard"
              ? styles.image
              : styles.image2
          }
          code={flag}
        />

        <span className={styles.btn}>
          <BlackButton
            id={id}
            notactive={
              (page == "/decks" && !colrow) || page == "/dashboard"
                ? true
                : false
            }
          >
            Continue
          </BlackButton>
        </span>
      </div>
      <div className={page == "/decks" && colrow ? styles.name2 : styles.name}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <LineGraph
        percent={percent}
        notactive={
          (page == "/decks" && !colrow) || page == "/dashboard" ? true : false
        }
      />
      <div
        className={
          (page == "/decks" && colrow) || page == "/dashboard"
            ? styles.flexrow
            : styles.flexcol
        }
      >
        <span
          className={`${
            (page == "/decks" && !colrow) || page == "/dashboard"
              ? styles.icon
              : styles.icon2
          } ${
            (page == "/decks" && !colrow) || page == "/dashboard"
              ? styles.time
              : styles.time2
          }`}
        >
          <img src={watch} alt="Time" /> <p>{time}</p>
        </span>
        <span
          className={`${
            (page == "/decks" && !colrow) || page == "/dashboard"
              ? styles.icon
              : styles.icon2
          } ${
            (page == "/decks" && !colrow) || page == "/dashboard"
              ? styles.numbercard
              : styles.numbercard2
          }`}
        >
          <img src={cards} alt="Time" /> <p>{numcards}</p>
        </span>
      </div>
      <CircleGraph
        circleWidth={42}
        fontsize="1.2rem"
        percent={percent}
        notactive={page == "/decks" && !colrow ? false : true}
      />
      <BlackButton
        id={id}
        notactive={page == "/dashboard" || !colrow ? false : true}
      >
        Continue
      </BlackButton>
    </div>
  );
}
