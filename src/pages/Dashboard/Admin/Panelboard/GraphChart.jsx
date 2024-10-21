import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const MonthlyLineChart = ({ orders }) => {
  const chartRef = useRef(null);

  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const completedOrders = Array(12).fill(0);
  const canceledOrders = Array(12).fill(0);
  const totalOrders = Array(12).fill(0);

  orders.forEach(order => {
    const orderDate = new Date(order.orderDetails.date);
    const orderMonth = orderDate.getMonth();
    totalOrders[orderMonth] += 1;

    if (order.orderDetails.status === 'Completed') {
      completedOrders[orderMonth] += 1;
    } else if (order.orderDetails.status === 'Canceled') {
      canceledOrders[orderMonth] += 1;
    }
  });

  const createGradient = (ctx, chartArea, color) => {
    if (!chartArea) return color; // If chartArea is not available, fallback to a solid color
    const gradient = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradient.addColorStop(0, `${color}33`); // Lighter at bottom
    gradient.addColorStop(1, `${color}AA`); // Darker at top
    return gradient;
  };

  const data = {
    labels: months,
    datasets: [
      {
        label: 'Total Ordered',
        data: totalOrders,
        borderColor: '#ff5100',
        backgroundColor: ctx => {
          const chart = chartRef.current;
          if (!chart) return '#ff5100'; // Return solid color if chart is not ready
          const { ctx: canvasCtx, chartArea } = chart;
          return createGradient(canvasCtx, chartArea, '#ff5100');
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Total Completed',
        data: completedOrders,
        borderColor: '#2dad47',
        backgroundColor: ctx => {
          const chart = chartRef.current;
          if (!chart) return '#2dad47'; // Return solid color if chart is not ready
          const { ctx: canvasCtx, chartArea } = chart;
          return createGradient(canvasCtx, chartArea, '#2dad47');
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
      },
      {
        label: 'Total Canceled',
        data: canceledOrders,
        borderColor: '#d10024',
        backgroundColor: ctx => {
          const chart = chartRef.current;
          if (!chart) return '#d10024'; // Return solid color if chart is not ready
          const { ctx: canvasCtx, chartArea } = chart;
          return createGradient(canvasCtx, chartArea, '#d10024');
        },
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          title: context => {
            const monthIndex = context[0].label;
            const year = new Date().getFullYear();
            return `${monthIndex} ${year}`;
          },
          label: context => `${context.dataset.label}: ${context.parsed.y}`,
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        titleFont: { size: 12, weight: 'bold' },
        bodyFont: { size: 10 },
        displayColors: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: { size: 12 },
          color: '#9E9E9E',
        },
      },
      y: {
        grid: {
          color: 'rgba(236, 236, 236, 1)',
          drawBorder: false,
        },
        ticks: {
          beginAtZero: true,
          stepSize: 5,
          font: { size: 12 },
          color: '#9E9E9E',
        },
      },
    },
  };

  return (
    <div className="w-full h-[370px] bg-white shadow-md rounded-md p-6 mt-5">
      <h3 className="text-center mb font-semibold">Summary Sales</h3>
      <div className="h-[300px]">
        <Line ref={chartRef} data={data} options={options} />
      </div>
    </div>
  );
};

export default MonthlyLineChart;
