// import icons:
import deleteicon from "../../assets/icons/delete.svg";
import closeicon from "../../assets/icons/close.svg";

import styles from "../../Style/buttons/Confirm.module.css";

export default function Confirm({
  iconurl = deleteicon,
  childeren = "Are you sure you want to delete this item?",
  canceltext = "No, Cancel",
  confirmtext = "Yes, I’m sure",
  close,
  confirm,
}) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            onClick={() => close()}
            className={styles.closebtn}
            src={closeicon}
            alt="close"
          />
          <div className={styles.content}>
            <img className={styles.icon} src={iconurl} alt="delete" />
            <p>{childeren}</p>
            <span className={styles.btns}>
              <button onClick={() => close()} className={styles.cancel}>
                {canceltext}
              </button>
              <button onClick={() => confirm()} className={styles.confirm}>
                {confirmtext}
              </button>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
