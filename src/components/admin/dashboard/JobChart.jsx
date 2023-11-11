import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import jobAPI from "../../../apis/jobAPI";
import { formatToDDMM } from "../../../utils/fomatDate";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

export default function JobChart() {
  const [jobData, setJobData] = useState([]);
  const [applicationData, setApplicationData] = useState([]);

  useEffect(() => {
    jobAPI.getStatistic().then((res) => {
      setJobData(res.data.jobStatistic);
      setApplicationData(res.data.applicationStatistic);
    });
  }, []);

  const currentDate = new Date();
  let labels = [];

  for (let i = 0; i < 7; i++) {
    const date = new Date(currentDate);
    date.setDate(date.getDate() - i);

    labels = [formatToDDMM(date), ...labels];
  }

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        label: "Application",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgb(255, 99, 132)",
        borderWidth: 2,
        fill: false,
        data: applicationData,
      },
      {
        type: "bar",
        label: "Job",
        backgroundColor: "rgb(75, 192, 192)",
        data: jobData,
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 2,
      },
    ],
  };
  return (
    <div
      style={{
        flex: "0 0 800px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h5>Job & Application Statistic</h5>
      <Chart type="bar" data={data} />
    </div>
  );
}
