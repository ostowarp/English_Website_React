import styles from "../../Style/charts/LineChart.module.css";
import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function LineChart() {
  // داده‌های نمونه
  const data = {
    labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Crds",
        data: [0, 1.5, 2.5, 1, 4, 3, 2],
        borderColor: "rgba(0, 0, 0, 1)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: "rgba(0, 0, 0, 1)",
        pointBorderColor: "rgba(0, 0, 0, 1)",
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
        pointHoverBorderColor: "rgba(255, 0, 0, 1)",
      },
    ],
  };

  // محاسبه مقدار بیشترین دیتا
  const maxData = Math.max(...data.datasets[0].data);
  const step = Math.ceil(maxData / 5);

  // تنظیم مقدار max برای محور Y به یک واحد بیشتر از بیشترین دیتا
  let maxY = maxData + 1;
  while (maxY % step !== 0) {
    maxY++;
  }

  // تنظیمات نمودار
  const options = {
    plugins: {
      legend: {
        display: false, // حذف نمایش لیبل (عنوان) بالای نمودار
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: maxY, // تنظیم مقدار max به یک واحد بیشتر از بیشترین دیتا
        grid: {
          display: true,
          drawBorder: false,
        },
        ticks: {
          stepSize: step,
          callback: function (value) {
            if (Number.isInteger(value)) {
              return value;
            }
          },
        },
      },
    },
    interaction: {
      mode: "index", // نحوه تعامل به حالت index تنظیم می‌شود
      intersect: false,
    },
  };

  return (
    <div className={styles.container}>
      <h1>Your statistics</h1>
      <h2>this week</h2>
      <Line data={data} options={options}  className={styles.chart} />
    </div>
  );
}
