// import Context:
import { ContactContext } from "../contexts/ContactContext";
import { useContext, useState } from "react";

// import components:
import { SearchBar, LineChart } from "./";
import Grid from "@mui/material/Grid2";

// import styles:
import styles from "../Style/ProfilePannel.module.css";

export default function ProfilePannel() {
  const { profile } = useContext(ContactContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(profile);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({ ...editedProfile, [name]: value });
  };

  const handleSave = () => {
    // Here you would typically update the profile in the context or send it to a server
    console.log("Profile saved:", editedProfile);
    setIsEditing(false);
  };

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
            <img
              src={editedProfile.image}
              alt="Profile Image"
              className={styles.profile_img}
            />
          </div>
          <div className={styles.profiel_details}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="username"
                  value={editedProfile.username}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Username"
                />

                <span className={styles.fullname}>
                  <input
                    type="text"
                    name="first_name"
                    value={editedProfile.first_name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    name="last_name"
                    value={editedProfile.last_name}
                    onChange={handleInputChange}
                    className={styles.inputField}
                    placeholder="Last Name"
                  />
                </span>
                <input
                  type="email"
                  name="email"
                  value={editedProfile.email}
                  onChange={handleInputChange}
                  className={styles.inputField}
                  placeholder="Email"
                />
              </>
            ) : (
              <>
                <p>{editedProfile.username}</p>
                <h4>
                  {editedProfile.first_name} {editedProfile.last_name}
                </h4>
                <p>{editedProfile.email}</p>
              </>
            )}
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
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <button onClick={handleEditToggle}>Edit Profile</button>
            )}
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
          order={{ xl: 3, lg: 3, md: 2, xs: 3 }}
        >
          {/* <LineChart></LineChart> */}
        </Grid>
      </Grid>
    </>
  );
}
