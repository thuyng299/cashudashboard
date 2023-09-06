import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import axios from "axios";

export default function MonthInAnalytics() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/incomingdetails/total-monthly-incoming"
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const data = chartData.map((item) => ({
      productcode: item.code,
      amount: item.totalAmount,
    }));

    const options = {
      title: {
        text: "INCOMING AMOUNT",
      },
      subtitle: {
        text: "In KGs",
      },
      data,
      series: [
        {
          type: "column",
          xKey: "productcode",
          yKey: "amount",
          fill: "#CD7574",
          highlightStyle: {
            item: {
              fill: "#F1A7B4",
              stroke: "#F1A7B4",
            },
          },
        },
      ],
      yAxes: [
        {
          type: "number",
          tick: {
            count: 1000, // Adjust the number of ticks displayed on the y-axis
          },
          label: {
            format: "{amount}", // Use custom formatting for the y-axis labels if needed
          },
        },
      ],
    };

    setOptions(options);
  }, [chartData]);

  const [options, setOptions] = useState(null);

  if (!options) {
    return null; // or show a loading spinner/placeholder
  }

  return <AgChartsReact options={options} />;
}
