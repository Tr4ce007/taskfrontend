// References :- https://github.com/joshcarr/largest-triangle-three-buckets.js/blob/master/lib/largest-triangle-three-buckets.js

const groupDataByYear = (data) => {
  const groupedData = {};

  data.forEach((d) => {
    const year = new Date(d?.timestamp).getFullYear();
    if (!groupedData[year]) {
      groupedData[year] = [];
    }
    groupedData[year].push(d?.profitPercentage);
  });

  return groupedData;
};

export const processDataForChart = (downsampledData) => {
  const groupedData = groupDataByYear(downsampledData);

  const labels = Object.keys(groupedData);
  const data = labels.map((year) => {
    // Calculate the average or some other relevant statistic for each year
    const avg =
      groupedData[year].reduce((sum, curr) => sum + curr, 0) /
      groupedData[year].length;
    return avg;
  });

  return {
    labels,
    datasets: [
      {
        label: "Average Profit Percentage",
        data,
        borderColor: "#25CD25",
        backgroundColor: 'rgba(37,205,37,0.2)',
        tension: 0.3,
        fill: true,
      },
    ],
  };
};
