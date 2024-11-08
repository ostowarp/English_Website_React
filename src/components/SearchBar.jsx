import styles from "../Style/SearchBar.module.css";
import searchicon from "../assets/icons/search.svg";
import moreicon from "../assets/icons/more.svg";
import notificationsicons from "../assets/icons/notifications.svg";

export default function SearchBar() {
  return (
    <div className={styles.searchnotif}>
      <div className={styles.search}>
        <img src={searchicon} alt="Search" className={styles.searchicon} />
        <input type="text" className={styles.searchinput} placeholder="Serch your deck name..." />
      </div>
      <div className={styles.notifprof}>
        <span className={styles.notificationsicons}>
          <p>22</p>
          <img src={notificationsicons} alt="Notif" />
        </span>
        <span className={styles.prof}>
          <img src="" alt="Profile" className={styles.profile} />
          <img src={moreicon} alt="More" />
        </span>
      </div>
    </div>
  );
}
