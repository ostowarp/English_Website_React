// import icons:
import f1icon from "../../assets/icons/filter1.svg";
import f2icon from "../../assets/icons/filter2.svg";

// import styles:
import styles from "../../Style/decks/Decks.module.css";

// import component:
import { Deck } from "../";

import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Decks() {
  const location = useLocation();
  const page = location.pathname;
  console.log(location.pathname);

  const [colfilter, setcolfilter] = useState(0);
  function handleClick2(filter) {
    if (filter == "row") setcolfilter(0);
    else if (filter == "col") setcolfilter(1);
    console.log(colfilter);
  }
  return (
    <div>
      <span className={styles.flexrow}>
        <h2 className={styles.header}>Decks</h2>
        <span className={page == "/dashboard" ? styles.none : styles.filters2}>
          <img
            className={colfilter ? "" : styles.deactivecolfilter}
            onClick={() => handleClick2("col")}
            src={f1icon}
            alt=""
          />
          <img
            className={colfilter ? styles.deactivecolfilter : ""}
            onClick={() => handleClick2("row")}
            src={f2icon}
            alt=""
          />
        </span>
      </span>
      <span className={page == "/dashboard" ? styles.filters : styles.none}>
        <h3>All Decks</h3>
        <h3>The Newest</h3>
        <h3>Top Reted</h3>
        <h3>Most Popular</h3>
      </span>
      <div className={styles.decksandfilter}>
        <div
          style={{ height: page == "/decks" ? "42rem" : "" }}
          className={styles.decks}
        >
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"12h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
          <Deck
            imgsrc={""}
            name={"first deck"}
            description={"my first Deck for english"}
            time={"11h 22m"}
            numcards={100}
            percent={60}
            colrow={colfilter}
          />
        </div>
        <div className={styles.filterdecks}></div>
      </div>
    </div>
  );
}
