// ........ import components ........
import Grid from "@mui/material/Grid2";

// ........ import Styles ........
import styles from "../../Style/cards/MiniCard.module.css";
import "./minicard.css";

// ........ import Icons ........
import deleteicon from "../../assets/icons/delete.svg";

export default function MiniCard({ card, handledeletecard, number }) {
  return (
    <>
      <Grid className={styles.card} size={{ xl: 3, lg: 4, md: 6, xs: 12 }}>
        <p
          className={styles.cardname}
          style={{ color: card.status ? "green" : "var(--red-low)" }}
        >
          - CARD ({number + 1}) -
        </p>
        <img
          onClick={() => handledeletecard(card.id)}
          className={styles.deleteicon}
          src={deleteicon}
          alt=""
        />
        <div
          className={styles.editor}
          style={{ width: "100%", overflowX: "hidden" }}
        >
          <div style={{ marginTop: "20px" }}>
            <div dangerouslySetInnerHTML={{ __html: card.front }} />
          </div>
        </div>
      </Grid>
    </>
  );
}
