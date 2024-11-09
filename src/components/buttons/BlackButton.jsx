import styles from "../../Style/buttons/BlackButton.module.css";
export default function BlackButton({ children, notactive }) {
  return (
    <button className={`${styles.button} ${notactive ? styles.active : ""}`}>
      {children}
    </button>
  );
}
