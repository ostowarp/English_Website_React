// import components:
import { SearchBar, LineChart } from "./";
import Grid from "@mui/material/Grid2";

// import styles:
import styles from "../Style/ProfilePannel.module.css";

export default function ProfilePannel() {
  return (
    <>
      <Grid
        item
        className={styles.container}
        container
        columnSpacing={{ xl: 8, lg: 5, md: 2, xs: 2 }}
        rowSpacing={3}
      >
        <Grid
          className={styles.profile}
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={2}
        ></Grid>
        <Grid
          item
          spacing={{ xl: 4, lg: 3, md: 2, xs: 2 }}
          container
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 2, lg: 2, md: 1, xs: 1 }}
        >
          <Grid size={12}>
            <SearchBar></SearchBar>
          </Grid>
          <Grid size={12}>
            <LineChart></LineChart>
          </Grid>
        </Grid>
        {/* <Grid size={{ xl: 6, lg: 6, md: 12, xs: 12 }} order={3}></Grid> */}
        <Grid
          size={{ xl: 6, lg: 6, md: 12, xs: 12 }}
          order={{ xl: 3, lg: 3, md: 2, xs: 2 }}
        >
          {/* <LineChart></LineChart> */}
        </Grid>
      </Grid>
    </>
  );
}
