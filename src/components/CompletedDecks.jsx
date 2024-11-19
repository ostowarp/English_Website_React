import { useContext, useEffect, usestate } from "react";

import styles from "../Style/CompletedDecks.module.css";
import Grid from "@mui/material/Grid2";
import Skeleton from "@mui/material/Skeleton";
import { useState } from "react";
import { getDeckComplete } from "../servicess";
import useTokenStore from "../store/useTokenstate";
import { ContactContext } from "../contexts/ContactContext";

export default function CompletedDecks() {
  const { completedDecks, dueDecks, setCompletedDecks, setDueDecks } =
    useContext(ContactContext);
  const { token } = useTokenStore();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await getDeckComplete(token);
      setCompletedDecks(data.completed_decks);
      setDueDecks(data.due_decks);
      console.log(data);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, [token]);
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
          <h2>{loading ? "" : completedDecks}</h2>
          <p>Decks Completed</p>
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 6, xs: 12 }}
          className={styles.completedbg}
        >
          <h2>{loading ? "" : dueDecks}</h2>
          <p>Decks in Progress</p>
        </Grid>
      </Grid>
    </>
  );
}
