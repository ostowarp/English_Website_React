// import components:
import { SearchBar } from "../";
import Grid from "@mui/material/Grid2";
import FlagIcon from "react-world-flags";

// import servicess:
import { getDeck } from "../../servicess";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

// import styles:
import styles from "../../Style/decks/SingleDeck.module.css";

// import icons:
import editicon from "../../assets/icons/edit.svg";
import deleteicon from "../../assets/icons/delete.svg";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";

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

export default function SingleDeck() {
  const [deck, setDeck] = useState();
  const { token } = useTokenStore();
  const { id } = useParams("id");
  useEffect(() => {
    const fetchDeck = async () => {
      try {
        const { data: deckdata } = await getDeck(token, id);
        setDeck(deckdata);
        console.log({ ...deckdata, language: deckdata.language });
      } catch {
        console.log("error");
      }
    };
    fetchDeck();
  }, [token]);

  return (
    <>
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 5, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        {deck ? (
          <Grid
            className={styles.deckdetails}
            size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
            order={2}
          >
            <div className={styles.nameedit}>
              <span className={styles.image}>
                <FlagIcon
                  code={getFlagByLabel(deck.language)}
                  style={{
                    width: "4.8rem",
                    height: "4.8rem",
                    borderRadius: ".8rem",
                  }}
                />
                <span className={styles.name}>
                  <h3>{deck.name}</h3>
                  <p>{deck.language}</p>
                </span>
              </span>
              <span className={styles.editdelete}>
                <img src={editicon} alt="" />
                <img src={deleteicon} alt="" />
              </span>
            </div>
            <p className={styles.description}>
              <span>Description: </span>
              {deck.description}
            </p>
            <div className={styles.categorys}>
              <span className={styles.category}>
                <p>romans</p>
              </span>
              <span className={styles.category}>
                <p>books</p>
              </span>
              <span className={styles.category}>
                <p>english</p>
              </span>
            </div>
          </Grid>
        ) : (
          ""
        )}

        <Grid
          item
          className={styles.search}
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 2, lg: 2, md: 1, xs: 1 }}
        >
          <SearchBar></SearchBar>
        </Grid>
        <Grid size={12} order={3}>
          dsafasddfjkaskdfl
        </Grid>
      </Grid>
    </>
  );
}
