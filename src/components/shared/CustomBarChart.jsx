import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const months = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];
const weekdays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
];
const hours = [
  "00",
  "01",
  "02",
  "03",
  "04",
  "05",
  "06",
  "07",
  "08",
  "09",
  "10",
  "11",
  "12",
  "13",
  "14",
  "15",
  "16",
  "17",
  "18",
  "19",
  "20",
  "21",
  "22",
  "23",
];

const options = {
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF80', // X-axis label color
        font: {
          family: 'Shabnam', // or 'Roboto', 'sans-serif', etc.
          size: 10,
          weight: 400,
        },
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        color: '#FFFFFFB2', // Y-axis label color
        font: {
          family: 'Shabnam',
          size: 12,
          weight: 400,
        },
      },
    },
  },
};

const CustomBarChart = ({ type, dataValues }) => {
  const data = {
    labels: type == "روزانه" ? hours : type == "هفتگی" ? weekdays : months,
    datasets: [
      {
        label: "",
        data: dataValues,
        backgroundColor: " #17B9FF",
      },
    ],
  };
  return <Bar options={options} data={data} />;
};

export default CustomBarChart;
