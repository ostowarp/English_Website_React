import { getServerUrl } from "../../servicess";

// import icons:
import f1icon from "../../assets/icons/filter1.svg";
import f2icon from "../../assets/icons/filter2.svg";

// import styles:
import styles from "../../Style/decks/Decks.module.css";

// import component:
import { Deck } from "../";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";

// import Servicess:
import { getDecks } from "../../servicess";

export default function Decks() {
  const [loading, setLoading] = useState(false);
  const serverurl = getServerUrl();
  const { token } = useTokenStore();
  const location = useLocation();
  const page = location.pathname;
  const [allDecks, setAllDecks] = useState([]);
  const [colfilter, setcolfilter] = useState(0);
  function handleClick2(filter) {
    if (filter == "row") setcolfilter(0);
    else if (filter == "col") setcolfilter(1);
    console.log(colfilter);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: decksData } = await getDecks(token, true);
        if (decksData && decksData.length > 0) {
          console.log("Decks Data received:", decksData); // نمایش داده‌ها برای بررسی
          setAllDecks(decksData);
        } else {
          console.log("No data received.");
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching decks:", error.message);
        setLoading(false); // اطمینان از تغییر وضعیت به false در صورت خطا
      }
    };
    if (token) {
      fetchData();
    }
  }, [token]);

  if (loading) {
    return <div>Loading.....</div>;
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
          {allDecks.length > 0 ? (
            allDecks.map((due) => {
              return (
                <Deck
                  key={due.id}
                  imgsrc={`${serverurl}${due.deck_image}`}
                  name={due.name} // فرض بر این است که نام از API دریافت می‌شود
                  description={due.description}
                  time={due.next_review}
                  numcards={due.card_count}
                  percent={due.percent}
                  colrow={colfilter}
                />
              );
            })
          ) : (
            <div>No decks available</div> // در صورتی که داده‌ای نباشد
          )}
        </div>
        <div className={styles.filterdecks}></div>
      </div>
    </div>
  );
}
