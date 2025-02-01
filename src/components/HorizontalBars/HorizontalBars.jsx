import React from "react";
import { useSelector } from "react-redux";
import { BarChart } from "@mui/x-charts/BarChart";

export default function HorizontalBars({ roundAvgArray }) {
  // Check if roundAvgArray is empty or undefined
  if (!roundAvgArray || roundAvgArray.length === 0) {
    return <p>Round average data not available</p>; // Fallback message
  }

  // Convert all values to numbers (handle cases where they might be strings)
  const numericData = roundAvgArray.map((value) => Number(value));

  return (
    <BarChart
      xAxis={[
        {
          label: "Average Round Score",
          scaleType: "band",
          data: Array.from(
            { length: roundAvgArray.length },
            (_, index) => index + 1
          ),
        },
      ]}
      series={[
        {
          // label: "Score",
          data: numericData, // Use converted numeric data
          color: "#2bde90de",
        },
      ]}
      width={700}
      height={275}
      minWidth={400}
    />
  );
}
