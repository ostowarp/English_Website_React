// import style:
import styles from "../../Style/decks/DeckTop.module.css";
// import component:
import { BlackButton , CircleGraph } from "..";
export default function DeckTop({ description, name, imgsrc, percent }) {
  return (
    <div className={styles.topdeck}>
      <img src={imgsrc} alt="Photo" className={styles.image} />
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
