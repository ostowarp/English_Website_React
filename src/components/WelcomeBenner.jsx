import Hand1 from "../assets/hand-left.svg";
import Hand2 from "../assets/hand-right.svg";
import { Box } from "@mui/material";
// import style:
import styles from "../Style/WelcomeBanner.module.css";
export default function WelcomeBanner({ name }) {
  return (
    <div className={styles.banner}>
      <Box
        sx={{ display: { md: "block"  , xs:"none" } }}
        component="img"
        alt="Hello"
        src={Hand1}
        className={styles.imgleft}
      />
      <div className={styles.text}>
        <h2 className="text-3xl font-bold">Hello {name}!</h2>
        <p className="text-base">it's good to see you again.</p>
      </div>
      <img src={Hand2} alt="Hello" className={styles.imgright} />
    </div>
  );
}
