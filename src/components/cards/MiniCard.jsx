// ........ import components ........
import Grid from "@mui/material/Grid2";
import { Confirm } from "../";

// ........ import Styles ........
import styles from "../../Style/cards/MiniCard.module.css";
import "./minicard.css";

// ........ import Icons ........
import deleteicon from "../../assets/icons/delete.svg";
import timeicon from "../../assets/icons/watch.svg";

import { useState } from "react";

export default function MiniCard({
  card,
  handledeletecard,
  number,
  handleViewCard,
}) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  return (
    <>
      {deleteConfirm ? (
        <Confirm
          confirm={() => {
            handledeletecard(card.id);
            setDeleteConfirm(!deleteConfirm);
          }}
          close={() => setDeleteConfirm(!deleteConfirm)}
        ></Confirm>
      ) : (
        ""
      )}
      <Grid
        // style={{ backgroundColor: card.status ? "#E9F2EE" : "#F5ECEE" }}
        className={styles.card}
        size={{ xl: 3, lg: 4, md: 6, xs: 12 }}
      >
        <img
          onClick={() => setDeleteConfirm(!deleteConfirm)}
          className={styles.deleteicon}
          src={deleteicon}
          alt="Delete"
        />
        <span
          className={styles.nexttime}
          style={{
            filter: card.status
              ? "invert(47%) sepia(81%) saturate(368%) hue-rotate(89deg) brightness(97%) contrast(90%)"
              : "invert(25%) sepia(100%) saturate(10000%) hue-rotate(0deg) brightness(100%) contrast(100%)",
            opacity: "100%",
          }}
        >
          <img
            onClick={() => setDeleteConfirm(!deleteConfirm)}
            className={styles.timeicon}
            src={timeicon}
            alt="Next"
          />
          <p>{card.next_review}</p>
        </span>
        <p
          className={styles.cardname}
          // style={{ color: card.status ? "green" : "var(--red-low)" }}
        >
          - CARD ({number + 1}) -
        </p>
        <div
          onClick={() => handleViewCard()}
          style={{
            width: "100%",
            height: "100%",
            // opacity: card.status ? "100%" : "70%",
          }}
        >
          <div
            className={styles.editor}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <div className="editormini" style={{ marginTop: "20px" }}>
              <div dangerouslySetInnerHTML={{ __html: card.front }} />
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
}
