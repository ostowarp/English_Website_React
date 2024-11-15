// import Context:
import { ContactContext } from "../contexts/ContactContext";
import { useContext } from "react";

import styles from "../Style/CompletedDecks.module.css";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";

export default function CompletedDecks() {
  const { completedDecks, dueDecks } = useContext(ContactContext);
  const [loading, setLoading] = useState(false);
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
          <h2>{completedDecks}</h2>
          <p>Decks Completed</p>
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 6, xs: 12 }}
          className={styles.completedbg}
        >
          <h2>{dueDecks}</h2>
          <p>Decks in Progress</p>
        </Grid>
      </Grid>
    </>
  );
}
