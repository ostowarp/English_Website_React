import styles from "../Style/Dashboard.module.css";
// import Grid from MUI:
import Grid from "@mui/material/Grid2";
// import component:
import {
  WelcomeBanner,
  SearchBar,
  CompletedDecks,
  DeckSlider,
  LineChart,
  Decks,
  AddDeck,
} from "./";

import { useEffect, useState } from "react";
import useTokenStore from "../store/useTokenstate";

const Dashboard = () => {
  const [addClose, setAddClose] = useState(false);
  const { token } = useTokenStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
      } catch {
        console.log("error");
      }
    };
  }, [token]);

  const handleclose = () => {
    setAddClose(!addClose);
  };
  return (
    <>
      {addClose ? <AddDeck handleclose={() => handleclose()}></AddDeck> : ""}

      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 5, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={2}>
          <WelcomeBanner></WelcomeBanner>
        </Grid>
        <Grid
          item
          className={styles.search}
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 2, lg: 2, md: 1, xs: 1 }}
        >
          <SearchBar></SearchBar>
          <CompletedDecks></CompletedDecks>
        </Grid>
        <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={3}>
          <DeckSlider />
          <Decks handleclose={() => handleclose()}></Decks>
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 3, lg: 3, md: 2, xs: 2 }}
        >
          <LineChart chartdata={[2,3,4,5,6,7,20]} />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
