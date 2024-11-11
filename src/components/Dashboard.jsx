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
} from "./";

import axios from "axios";
axios.defaults.headers.common["Authorization"] =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMxMTk0NTE2LCJpYXQiOjE3MzExNTg1MTYsImp0aSI6ImIzMzQ2ZDEyMGM2MTQxMGE4ZjZkZTM2NDU5NDU5MTYxIiwidXNlcl9pZCI6N30.OvkmyqHUCKXHzH5n70eMa1hNBTmSWjK9V6SdX-OXwK8";
import { useEffect, useState } from "react";

const Dashboard = ({name , profile}) => {
  return (
    <>
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg:5, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={2}>
          <WelcomeBanner name={name}></WelcomeBanner>
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
          <DeckSlider />
          <Decks></Decks>
        </Grid>
        <Grid
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 3, lg: 3, md: 2, xs: 2 }}
        >
          <LineChart />
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
