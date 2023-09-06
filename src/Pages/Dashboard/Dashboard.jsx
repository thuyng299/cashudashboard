import React, { useState, useEffect } from "react";
import { Row, Col, Card, Statistic, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import Widget from "../../Components/DashboardCharts/Widget";
import RawChart from "../../Components/DashboardCharts/RawChart";
import FGChart from "../../Components/DashboardCharts/FGChart";
import OutgoingTable from "../../Components/DashboardCharts/OutgoingTable";

const { Title } = Typography;

export default function DashBoard() {
  return (
    <div className="container">
      <Row className="rowDashboard">
        <Col span={6} className="columnDashboard" id="columnDashboard1">
          <Card
            title={<h3 style={{ fontSize: "24px" }}>Monthly Overview</h3>}
            bordered={false}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <Widget />
          </Card>
        </Col>

        <Col span={8} className="columnDashboard" id="columnDashboard2">
          <Card
            title={<h3 style={{ fontSize: "24px" }}>Raw Cashew Nuts</h3>}
            bordered={false}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <RawChart />
          </Card>{" "}
        </Col>

        <Col span={8} className="columnDashboard" id="columnDashboard3">
          <Card
            title={<h3 style={{ fontSize: "24px" }}>Finished Goods</h3>}
            bordered={false}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <FGChart />
          </Card>{" "}
        </Col>
      </Row>
      <Row className="rowDashboard">
        <Col span={23}>
          <Card
            title={<h3 style={{ fontSize: "24px" }}>Delivery Orders</h3>}
            bordered={false}
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <OutgoingTable />
          </Card>
        </Col>
      </Row>
    </div>
  );
}
