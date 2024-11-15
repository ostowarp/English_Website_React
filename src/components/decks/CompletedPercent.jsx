// import contexts:
import { ContactContext } from "../../contexts/ContactContext";
import { useContext, useEffect, useState } from "react";

// import components:
import { CircleGraph } from "../";

// import Stylse:
import styles from "../../Style/decks/NewDeck.module.css";

export default function CompletedPercent() {
  const { completedDecks, dueDecks } = useContext(ContactContext);
  const alldeck = dueDecks + completedDecks;
  const percent = (completedDecks / (alldeck ? alldeck : 1)) * 100;

  console.log(Math.floor((completedDecks / (alldeck ? alldeck : 1)) * 100));

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h3>Completed Decks</h3>
        <p>The amount of your decks that have been completed</p>
      </div>
      <CircleGraph
        circleWidth={64}
        percent={Math.floor((completedDecks / (alldeck ? alldeck : 1)) * 100)}
        strok=".5rem"
        fontsize="1.8rem"
      ></CircleGraph>
    </div>
  );
}
