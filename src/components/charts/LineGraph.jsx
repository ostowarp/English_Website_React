import styles from "../../Style/charts/LineGraph.module.css";
export default function LineChart({ percent = 0, notactive }) {
  return (
    <div className={notactive ? styles.active : ""}>
      <div className={styles.all}>
        <p className={styles.text} style={{ width: `${percent + 10}%` }}>
          {Math.floor(percent)}%
        </p>
        <div className={styles.container}>
          <div className={styles.skill} style={{ width: `${percent}%` }}></div>
        </div>
      </div>
    </div>
  );
}
