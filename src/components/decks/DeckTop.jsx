// import style:
import styles from "../../Style/decks/DeckTop.module.css";
// import component:
import { BlackButton, CircleGraph } from "..";

// get flag Icon:
import FlagIcon from "react-world-flags";
const languages = [
  { label: "Afrikaans", flag: "ZA" },
  { label: "Arabic", flag: "SA" },
  { label: "Persian", flag: "IR" },
  { label: "English", flag: "GB" },
  { label: "French", flag: "FR" },
  { label: "Spanish", flag: "ES" },
  { label: "German", flag: "DE" },
  { label: "Russian", flag: "RU" },
  { label: "Chinese", flag: "CN" },
  { label: "Japanese", flag: "JP" },
];
const getFlagByLabel = (label) => {
  const language = languages.find(
    (lang) => lang.label.toLowerCase() === label.toLowerCase()
  );
  return language ? language.flag : "unknown";
};
export default function DeckTop({ description, name, language, percent }) {
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
      <BlackButton>Continue</BlackButton>
    </div>
  );
}
