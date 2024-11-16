import styles from "../../Style/buttons/BlackButton.module.css";
import { useNavigate } from "react-router-dom";
export default function BlackButton({ children, notactive, id }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(`/decks/${id}`);
      }}
      className={`${styles.button} ${notactive ? styles.active : ""}`}
    >
      {children}
    </button>
  );
}
