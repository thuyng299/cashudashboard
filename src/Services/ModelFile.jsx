import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import axios from "axios";

const CustomPieChart = () => {
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/incomingdetails/totalstock-finishedgood"
      );
      setChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = chartData.map((item) => ({
    type: item.productCode,
    count: item.totalStockAmount,
  }));

  const numFormatter = new Intl.NumberFormat("en-US");
  const total = data.reduce((sum, d) => sum + d["count"], 0);

  const options = {
    autoSize: true,
    data,
    series: [
      {
        type: "pie",
        calloutLabelKey: "type",
        fillOpacity: 0.9,
        strokeWidth: 0,
        angleKey: "count",
        sectorLabelKey: "count",
        calloutLabel: {
          enabled: false,
        },
        sectorLabel: {
          color: "transparent",
          fontWeight: "bold",
          formatter: ({ datum, sectorLabelKey }) => {
            const value = datum[sectorLabelKey];
            return numFormatter.format(value);
          },
        },
        fills: [
          "#67A3D9",
          "#F9C6D1",
          "#F9D7D6",
          "#FFF7F6",
          "#B0C1DB",
          "#8EACD0",
          "#67A3D9",
          "#8EACD0",
          "#67A3D9",
          "#CD5E77",
        ],
        innerRadiusRatio: 0.5,
        innerLabels: [
          {
            text: numFormatter.format(total),
            fontSize: 24,
            fontWeight: "bold",
          },
          {
            text: "Total",
            fontSize: 16,
          },
        ],
        highlightStyle: {
          item: {
            fillOpacity: 0,
            strokeWidth: 1,
          },
        },
        tooltip: {
          renderer: ({ datum, calloutLabelKey, sectorLabelKey }) => {
            return {
              content: `${datum[calloutLabelKey]}: ${numFormatter.format(
                datum[sectorLabelKey]
              )}`,
            };
          },
        },
      },
    ],
  };

  return <AgChartsReact options={options} />;
};

export default CustomPieChart;
