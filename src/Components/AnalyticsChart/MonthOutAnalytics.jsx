import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import axios from "axios";

export default function MonthOutAnalytics() {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/outgoingdetails/total-monthly-outgoing"
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
        text: "OUTGOING AMOUNT",
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
    };

    setOptions(options);
  }, [chartData]);

  const [options, setOptions] = useState(null);

  if (!options) {
    return null; // or show a loading spinner/placeholder
  }

  return <AgChartsReact options={options} />;
}
