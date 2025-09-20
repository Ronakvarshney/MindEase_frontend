// MoodChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart elements
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodChart = ({ moodData }) => {
  // Prepare the data for the line chart
  const data = {
    labels: moodData.map((entry) => entry.date), // Dates from moodData
    datasets: [
      {
        label: 'Mood Score',
        data: moodData.map((entry) => entry.moodScore), // Mood scores over time
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Mood Tracking Over Time',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mood Tracking</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MoodChart;
