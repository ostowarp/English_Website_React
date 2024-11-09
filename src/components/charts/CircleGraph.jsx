// import style:
import styles from "../../Style/charts/CircleGraph.module.css";

import { useState } from "react";

export default function CircleGraph({ circleWidth, percent = 0, notactive }) {
  const redius = circleWidth / 2 - 2;
  const dashArray = redius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * percent) / 100;
  return (
    <div className={notactive ? styles.active : ""}>
      <svg
        width={circleWidth}
        height={circleWidth}
        viewBox={`0 0 ${circleWidth} ${circleWidth}`}
      >
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={redius}
          className={styles.background}
        />
        <circle
          cx={circleWidth / 2}
          cy={circleWidth / 2}
          strokeWidth="3px"
          r={redius}
          className={styles.progress}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          transform={`rotate(-90 ${circleWidth / 2} ${circleWidth / 2})`}
        />
        <text
          x="50%"
          y="50%"
          dy="0.3em"
          textAnchor="middle"
          className={styles.text}
        >
          {percent}%
        </text>
      </svg>
    </div>
  );
}
