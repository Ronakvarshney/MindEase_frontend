import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const MentalHealthLineChart = ({ scoresOverTime }) => {
  // Using scoresOverTime as an array of scores
  const data = {
    labels: scoresOverTime.map((_, index) => index + 1), // Sequential index as X-axis (1, 2, 3,...)
    datasets: [
      {
        label: 'Mental Health Score',
        data: scoresOverTime, // Scores directly
        fill: false,
        borderColor: '#FF5733', // Line color
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
        text: 'Mental Health Score Over Time (Without Dates)',
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">Mental Health Progress</h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default MentalHealthLineChart;
