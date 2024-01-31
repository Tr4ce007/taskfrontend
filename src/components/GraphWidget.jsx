import React, { useEffect, useRef, useState } from "react";
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
  registerables,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CustomText from "./CustomText";
import {
  largestTriangleThreeBuckets,
  processDataForChart,
} from "../utils/helper";
import FileUpload from "./FileUpload";
import graphsortby from "../assets/graphsortby.png";
import { options } from "../utils/constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ...registerables
);

const GraphWidget = ({ title }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://chakrtask.onrender.com/api/downsampled');
        const downsampledData = await response.json();
        console.log(downsampledData);
      // Prepare the data for Chart.js
        const NewData = processDataForChart(downsampledData);
        setChartData(NewData);
      } catch (error) {
        console.error('Error fetching data from the API', error);
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <div className="w-full p-6 flex flex-col gap-2 items-start bg-white rounded-2xl shadow-xl">
        <div className="w-full flex pb-4 justify-between items-center">
          <CustomText
            title={title}
            className={"text-xl font-semibold text-[#131313]"}
          />

          <div className="flex items-center gap-1">
            <span className="text-[#454545] text-sm font-normal">Yearly</span>
            <button>
              <img src={graphsortby} alt="graph-sortby" loading="lazy"/>
            </button>
          </div>
        </div>

        <Line options={options} data={chartData} />
      </div>
    </>
  );
};

export default GraphWidget;
