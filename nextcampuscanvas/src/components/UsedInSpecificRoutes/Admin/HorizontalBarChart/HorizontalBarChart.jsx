//See: https://react-chartjs-2.js.org/examples/horizontal-bar-chart
//See: https://www.chartjs.org/docs/latest/charts/bar.html

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = ({ chartData, title }) => {
  return (
    <>
      <Bar
        data={chartData}
        options={{
          //Make chart horizontal
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          layout: {
            padding: 5,
          },
          scales: {
            x: {
              grid: {
                display: false,
              },
            },
            y: {
              grid: {
                display: false,
              },
              ticks: {
                font: {
                  size: 10,
                },
                //Limit the length of the labels
                callback: function (value, index, ticks) {
                  const label = this.getLabelForValue(value);
                  if (label?.length > 20) {
                    return label.substring(0, 20) + '...';
                  }
                  return label;
                },
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: title,
              color: '#1e0230',
              font: {
                size: 20,
              },
            },
          },
        }}
      />
    </>
  );
};

export default HorizontalBarChart;
