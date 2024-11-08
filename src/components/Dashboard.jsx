import styles from "../Style/Dashboard.module.css";
// import Grid from MUI:
import Grid from "@mui/material/Grid2";
import WelcomeBanner from "./WelcomeBenner";
import SearchBar from "./SearchBar";
import CompletedDecks from "./CompletedDecks";
const Dashboard = () => {
  return (
    <>
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 8, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={2}>
          <WelcomeBanner name="poori"></WelcomeBanner>
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
        <Grid size={6} sx={{backgroundColor:"red" ,height:"200px"}} order={3}></Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
