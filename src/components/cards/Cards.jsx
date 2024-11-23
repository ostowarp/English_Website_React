// ........ import components ........
import { AddCard, Confirm, MiniCard } from "../";
import Grid from "@mui/material/Grid2";

// ........ import Style ........
import addicon from "../../assets/icons/add.svg";
import handicon from "../../assets/handtoadd.svg";

// import "@ckeditor/ckeditor5-basic-styles/build/basic-styles";

// ........ import Style ........
import styles from "../../Style/cards/Cards.module.css";

// ........ import Servicess ........
import { getFlashCards, review_delete_flashcard } from "../../servicess";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ........ import Golobal State ........
import useTokenStore from "../../store/useTokenstate";

export default function Cards({ handleUpdateCards, update }) {
  const { token } = useTokenStore();
  const [addCard, setAddCard] = useState(false);
  const param = useParams();
  const [cards, setCards] = useState([]);

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleAddCard = () => {
    setAddCard(!addCard);
    console.log("add card");
  };

  const fetchCards = async () => {
    try {
      const { data: cardsdata } = await getFlashCards(token, param.id, true);
      setCards(cardsdata);
      console.log(cardsdata);
    } catch (error) {
      console.log(error.message);
    }
  };

  const [cardfordelete, setCardfordelete] = useState();
  const handleConfirmdelete = (cid) => {
    setCardfordelete(cid);
    setDeleteConfirm(!deleteConfirm);
  };

  const handledeletecard = async () => {
    try {
      const { data: deletedata } = review_delete_flashcard(
        token,
        cardfordelete,
        false
      );
      console.log(deletedata);
      setDeleteConfirm(!deleteConfirm);
      handleUpdateCards();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchCards();
  }, [token]);

  useEffect(() => {
    fetchCards();
  }, [update]);

  return (
    <>
      {deleteConfirm ? (
        <Confirm
          confirm={() => handledeletecard()}
          close={() => setDeleteConfirm(!deleteConfirm)}
        ></Confirm>
      ) : (
        ""
      )}
      {addCard ? (
        <AddCard
          handleUpdate={() => handleUpdateCards()}
          handleAddCard={() => handleAddCard()}
        ></AddCard>
      ) : (
        ""
      )}
      <h2 className={styles.title}>Cards:</h2>
      <Grid container className={styles.cards} spacing={"3.4rem"}>
        <Grid className={styles.addcard} size={{ xl: 3, lg: 4, md: 6, xs: 12 }}>
          <h3>Add New card</h3>
          <img
            onClick={() => handleAddCard()}
            className={styles.addicon}
            src={addicon}
            alt="add"
          />
          <img className={styles.handicon} src={handicon} alt="" />
        </Grid>
        {cards
          ? cards.map((card, index) => {
              return (
                <MiniCard
                  number={index}
                  handledeletecard={() => handleConfirmdelete(card.id)}
                  key={card.id}
                  card={card}
                ></MiniCard>
              );
            })
          : ""}
      </Grid>
    </>
  );
}
