import "../../CSS/scss/widget.scss";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Card, Statistic } from "antd";

export default function Widget() {
  // Incoming amount within this month
  const [widgetData, setWidgetData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/incomingdetails/total-incoming-within-month"
      );

      setWidgetData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Outgoing amount within this month
  const [secondWidgetData, setSecondWidgetData] = useState([]);

  const fetchSecondData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/outgoingdetails/total-outgoing-within-month"
      );

      setSecondWidgetData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchSecondData();
  }, []);

  // Stock amount that has not expired yet
  const [thirdWidgetData, setThirdWidgetData] = useState([]);

  const fetchThirdData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/incomingdetails/total-stock-not-expiration"
      );

      setThirdWidgetData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchThirdData();
  }, []);

  return (
    <>
      <Card
        bordered={true}
        style={{
          height: 90,

          marginBottom: 10,
          backgroundColor: "#67A3D9",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "black", fontSize: "25px" }}>INCOMINGS </div>
          <Statistic
            value={widgetData}
            valueStyle={{ color: "white", fontSize: "35px" }}
          />
        </div>
        <div style={{ textAlign: "right", color: "white" }}>KGs</div>
      </Card>
      <Card
        bordered={true}
        style={{
          height: 90,

          marginBottom: 10,
          backgroundColor: "#B0C1DB",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <div style={{ color: "black", fontSize: "25px" }}>OUTGOINGS</div>

          <Statistic
            value={secondWidgetData}
            valueStyle={{ color: "white", fontSize: "35px" }}
          />
        </div>
        <div style={{ textAlign: "right", color: "white" }}>KGs</div>
      </Card>
      <Card
        bordered={true}
        style={{
          height: 90,

          backgroundColor: "#8EACD0",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "black", fontSize: "25px" }}>STOCKS</div>
          <Statistic
            value={thirdWidgetData}
            valueStyle={{ color: "white", fontSize: "35px" }}
          />
        </div>
        <div style={{ textAlign: "right", color: "white" }}>KGs</div>
      </Card>
    </>
  );
}
