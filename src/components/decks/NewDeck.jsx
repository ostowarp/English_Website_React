// import style:
import styles from "../../Style/decks/NewDeck.module.css";

// import icons:
import addicon from "../../assets/icons/adddeck.svg";

export default function NewDeck({ handleclose, display = true }) {
  return (
    <>
      <div
        style={{ height: display ? "16.1rem" : "10rem" }}
        className={styles.container}
      >
        <div
          style={{ height: display ? "" : "auto" }}
          className={display ? styles.text : styles.nothover}
        >
          <h3 style={{ width: display ? "12.2rem" : "auto" }}>
            Build Your Decks
          </h3>
          <p style={{ display: display ? "block" : "none" }}>
            Create new decks for yourself and create new cards in it
          </p>
        </div>
        <img
          onClick={() => handleclose()}
          style={{ cursor: "pointer" }}
          src={addicon}
          alt=""
        />
      </div>
    </>
  );
}
