// import components:
import {
  SearchBar,
  CompletedCard,
  Confirm,
  Cards,
  Training,
  AddDeck,
} from "../";
import Grid from "@mui/material/Grid2";
import FlagIcon from "react-world-flags";

// import servicess:
import { getDeck, deleteDeck } from "../../servicess";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

// import styles:
import styles from "../../Style/decks/SingleDeck.module.css";

// import icons:
import editicon from "../../assets/icons/edit.svg";
import deleteicon from "../../assets/icons/delete.svg";

// import golobal state:
import useTokenStore from "../../store/useTokenstate";
// import languages:
import { languages } from "../../contexts/data";

const getFlagByLabel = (label) => {
  const language = languages.find(
    (lang) => lang.label.toLowerCase() === label.toLowerCase()
  );
  return language ? language.flag : "unknown";
};

export default function SingleDeck() {
  const [startTraining, setStartTraining] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const navigate = useNavigate();
  const [deck, setDeck] = useState();
  const { token } = useTokenStore();
  const { id } = useParams("id");
  const [update, setUpdate] = useState(false);
  const [updateDeck, setUpdateDeck] = useState(false);

  const fetchDeck = async () => {
    try {
      const { data: deckdata } = await getDeck(token, id);
      setDeck(deckdata);
    } catch {
      console.log("error");
    }
  };

  // handle update deck:
  const handleUpdate = () => {
    setUpdate(!update);
  };

  // Handle Delete:
  const handleDeleteDeck = async () => {
    try {
      const { data: deckDeletedata } = await deleteDeck(token, deck.id);
      navigate("/decks");

      log(deckDelete);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleconfirm = () => {
    setConfirm(!confirm);
  };

  useEffect(() => {
    fetchDeck();
  }, [token]);

  useEffect(() => {
    fetchDeck();
  }, [update]);

  return (
    <>
      {updateDeck ? (
        <AddDeck
          handleClose={() => {
            setUpdateDeck(false);
          }}
          handleUpdate={() => handleUpdate()}
          isUpdate={true}
          deckData={deck}
        />
      ) : (
        ""
      )}
      {startTraining ? (
        <>
          <Training
            setStartTraining={() => {
              setStartTraining(false);
              handleUpdate();
            }}
          ></Training>
        </>
      ) : (
        ""
      )}
      {confirm ? (
        <Confirm
          close={() => handleconfirm()}
          confirm={() => handleDeleteDeck()}
        ></Confirm>
      ) : (
        ""
      )}
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 5, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        {deck ? (
          <>
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
                  <img
                    onClick={() => setUpdateDeck(true)}
                    src={editicon}
                    alt="edit"
                    style={{ cursor: "pointer" }}
                  />
                  <img
                    onClick={() => handleconfirm()}
                    src={deleteicon}
                    alt="delete"
                    style={{ cursor: "pointer" }}
                  />
                </span>
              </div>
              <p className={styles.description}>
                <span>Description: </span>
                {deck.description}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: ".8rem",
                }}
              >
                <h4
                  style={{
                    fontSize: "1.4rem",
                    fontFamily: "var(--rooney-medium)",
                  }}
                >
                  Category:
                </h4>
                <div className={styles.categories}>
                  {deck.categories.map((category, index) => (
                    <span key={category.id} className={styles.category}>
                      <p>{category.name}</p>
                    </span>
                  ))}
                </div>
              </div>
            </Grid>

            <Grid
              item
              className={styles.search}
              size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
              order={{ xl: 2, lg: 2, md: 1, xs: 1 }}
            >
              <SearchBar></SearchBar>
              <CompletedCard
                setStartTraining={() => setStartTraining(true)}
                percent={deck.completed_cards}
              ></CompletedCard>
            </Grid>
          </>
        ) : (
          ""
        )}
        <Grid size={12} order={3}>
          <div>
            {" "}
            <Cards
              update={update}
              handleUpdateCards={() => handleUpdate()}
            ></Cards>
          </div>
        </Grid>
      </Grid>
    </>
  );
}
