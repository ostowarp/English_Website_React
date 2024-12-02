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
        >
          <div className={styles.channel_art}>
            <img src="" alt="Profile Image" className={styles.profile_img} />
          </div>
          <div className={styles.profiel_details}>
            <p>ostowar.p.a</p>
            <h4>pooria ostowar</h4>
            <p>ostowar.p.a@gmail.com</p>
          </div>
          <div className={styles.profile_counts}>
            <span>
              <h4>14</h4>
              <p>Decks</p>
            </span>
            <span>
              <h4>12</h4>
              <p>Cards</p>
            </span>
            <span>
              <h4>12</h4>
              <p>Followers</p>
            </span>
          </div>
          <div className={styles.profile_buttons}>
            <button>Edit Profile</button>
            <button>Profile Settings</button>
          </div>
        </Grid>
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
