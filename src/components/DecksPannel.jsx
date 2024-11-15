import styles from "../Style/Dashboard.module.css";
// import Grid from MUI:
import Grid from "@mui/material/Grid2";

// import component:
import {
  SearchBar,
  CompletedDecks,
  Decks,
  NewDeck,
  CompletedPercent,
} from "./";

const Dashboard = ({ profile }) => {
  return (
    <>
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 8, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        <Grid
          container
          spacing={{ xl: 4, lg: 4, md: 2, xs: 2 }}
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={2}
        >
          <Grid size={{ xl: 6, lg: 6, md: 6, xs: 12 }}>
            <NewDeck></NewDeck>
          </Grid>
          <Grid size={{ xl: 6, lg: 6, md: 6, xs: 12 }}>
            <CompletedPercent></CompletedPercent>
          </Grid>
        </Grid>
        <Grid
          item
          className={styles.search}
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 2, lg: 2, md: 1, xs: 1 }}
        >
          <SearchBar profile={profile}></SearchBar>
          <CompletedDecks></CompletedDecks>
        </Grid>
        <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={3}>
          <Decks></Decks>
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 3, lg: 3, md: 2, xs: 2 }}
        >
          <h1>filter of decks</h1>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
