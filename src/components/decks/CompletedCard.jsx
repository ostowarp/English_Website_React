// import components:
import { CircleGraph } from "../";
import Grid from "@mui/material/Grid2";

// import styles:
import styles from "../../Style/decks/CompletedCard.module.css";

export default function CompletedCard({ percent, setStartTraining }) {
  return (
    <>
      <Grid
        className={styles.completedprogress}
        container
        spacing={{ xl: 4, lg: 4, md: 2, xs: 2 }}
      >
        <Grid
          size={{ xl: 6, lg: 6, md: 6, xs: 12 }}
          className={styles.completedbg}
        >
          <h3>Completed</h3>
          <CircleGraph
            circleWidth={64}
            percent={Math.floor(percent)}
            strok=".5rem"
            fontsize="1.8rem"
          ></CircleGraph>
        </Grid>
        <Grid
          onClick={() => setStartTraining()}
          size={{ xl: 6, lg: 6, md: 6, xs: 12 }}
          className={styles.completedbg}
          style={{ backgroundColor: "black", cursor: "pointer" }}
        >
          <h3 style={{ color: "white" }}>Start Training</h3>
        </Grid>
      </Grid>
    </>
  );
}
