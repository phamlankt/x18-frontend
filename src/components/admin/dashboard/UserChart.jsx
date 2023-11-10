import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import userAPI from "../../../apis/userAPI";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function UserChart() {
  const [lable, setLable] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    userAPI
      .getStatistic()
      .then((res) => {
        const term = res.data;

        setLable(Object.keys(term));
        setData(Object.values(term));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const dataPie = {
    labels: lable,
    datasets: [
      {
        label: "Percentage",
        data: data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h5>User Statistic</h5>
      <Pie data={dataPie} />
    </div>
  );
}
