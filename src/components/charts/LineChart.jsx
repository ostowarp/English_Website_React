import styles from "../../Style/charts/LineChart.module.css";
import React, { useEffect, useState } from "react";
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
import { get_chart_data } from "../../servicess";
import useTokenStore from "../../store/useTokenstate";

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
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState(false);
  const { token } = useTokenStore();
  const [chartData, setChartData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const fetchChart = async () => {
    try {
      setLoading(true);
      const { data: apidata } = await get_chart_data(token, month);
      setChartData(apidata);
      console.log(apidata);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchChart();
  }, [token]);
  useEffect(() => {
    fetchChart();
  }, [month]);

  return (
    <div className={styles.container}>
      <h2>Your Statistics</h2>
      <div className={styles.filters}>
        <h3
          onClick={() => setMonth(false)}
          style={{ color: month ? "var(--gray-hard)" : "black" }}
        >
          This Week
        </h3>
        <h3
          onClick={() => setMonth(true)}
          style={{ color: month ? "black" : "var(--gray-hard)" }}
        >
          This Mounth
        </h3>
      </div>
      {loading ? (
        ""
      ) : (
        <Line
          data={{
            labels: chartData.map((d) => d.day),
            datasets: [
              {
                label: "Crds",
                data: chartData.map((d) => d.count),
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
          }}
          options={{
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
                // max: maxY, // تنظیم مقدار max به یک واحد بیشتر از بیشترین دیتا
                grid: {
                  display: true,
                  drawBorder: false,
                },
                ticks: {
                  stepSize: Math.ceil(
                    Math.max(...chartData.map((d) => d.count)) / 5
                  ),
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
          }}
          className={styles.chart}
        />
      )}
    </div>
  );
}
