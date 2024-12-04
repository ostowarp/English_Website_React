// import style:
import styles from "../../Style/decks/DeckTop.module.css";
// import component:
import { BlackButton, CircleGraph } from "..";

import FlagIcon from "react-world-flags";
// import data:
import { languages } from "../../contexts/data";
const getFlagByLabel = (label) => {
  const language = languages.find(
    (lang) => lang.label.toLowerCase() === label.toLowerCase()
  );
  return language ? language.flag : "unknown";
};
export default function DeckTop({ description, name, language, percent, id }) {
  const flag = getFlagByLabel(language);
  return (
    <div className={styles.topdeck}>
      <FlagIcon className={styles.image} code={flag} />
      <div className={styles.name}>
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
      <div className={styles.graph}>
        <CircleGraph percent={percent} circleWidth="42" />
      </div>
      <BlackButton id={id}>Continue</BlackButton>
    </div>
  );
}
