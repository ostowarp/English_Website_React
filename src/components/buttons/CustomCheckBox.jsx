import React from "react";
import styles from "../../Style/buttons/CustomCheckbox.module.css";

// import icons:
import addicon from "../../assets/icons/add.svg";

const CustomCheckbox = ({ label, checked, onChange }) => {
  return (
    <div className={styles.checkboxItem}>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        className={styles.customCheckbox}
        checked={checked}
        onChange={onChange}
      />

      <label
        htmlFor={`checkbox-${label}`}
        className={styles.customCheckboxLabel}
      >
        <span className={styles.boxcontent}>
          <p style={{ fontSize: "1.4rem", fontFamily: "var(--rooney-medium)" }}>
            {label}
          </p>
          <img src={addicon} alt="" />
        </span>
      </label>
    </div>
  );
};

export default CustomCheckbox;
