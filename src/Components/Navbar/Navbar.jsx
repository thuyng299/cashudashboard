import React, { useState } from "react";
import { Menu, Button, Divider, Switch } from "antd";
import {
  DashboardOutlined,
  LineChartOutlined,
  EditOutlined,
  PrinterOutlined,
  SolutionOutlined,
  LogoutOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import logo from "../../cashu.png";

import "../../CSS/scss/styles.scss";
import "../../CSS/scss/styles.css";
function Navbar() {
  const remove = () => {
    localStorage.removeItem("userLogin");
    window.location.reload();
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "rgba(177, 120, 84,0.9)",
        borderRadius: "20px",
        height: "100%",
        textAlign: "left",
      }}
    >
      <div id="logo" className="logo-container">
        <img src={logo} alt="" className="logo-image" />
      </div>
      <Divider
        style={{
          borderColor: "white",
          opacity: "0.5",
          marginTop: "0",
          marginBottom: "100",
        }}
      />
      <Menu
        className="menuItem"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0)",
          fontWeight: "500",
          color: "white",
          marginTop: "100",
        }}
        mode="inline"
      >
        <Menu.Item className="menuItem" key="1">
          <div className="content">
            <NavLink to="/dashboard">
              <DashboardOutlined className="icon" />
              <span>Dashboard</span>{" "}
            </NavLink>
          </div>
        </Menu.Item>
        <Menu.Item className="menuItem" key="2">
          <div className="content">
            <NavLink to="/analytics">
              <LineChartOutlined className="icon" />
              <span>Analytics</span>{" "}
            </NavLink>
          </div>
        </Menu.Item>
        <Menu.Item className="menuItem" key="3">
          <div className="content">
            <NavLink to="/innote">
              <EditOutlined className="icon" />
              <span>Receipt Note </span>{" "}
            </NavLink>
          </div>
        </Menu.Item>
        <Menu.Item className="menuItem" key="4">
          <div className="content">
            <NavLink to="/outnote">
              <PrinterOutlined className="icon" />
              <span>Delivery Note</span>
            </NavLink>
          </div>
        </Menu.Item>
        <Menu.Item className="menuItem" key="5">
          <div className="content">
            <NavLink to="/companyInfo">
              <SolutionOutlined className="icon" />
              <span>Sharing Hub</span>
            </NavLink>
          </div>
        </Menu.Item>
        <Divider
          style={{
            borderColor: "white",
            opacity: "0.5",
            width: "1px",
            marginTop: "30",
          }}
        />
        <Menu.Item className="menuItem" key="6">
          <NavLink onClick={remove}>
            <div className="content">
              <LogoutOutlined className="icon" />
              <span>Log out</span>
            </div>
          </NavLink>
        </Menu.Item>
      </Menu>
    </div>
  );
}

export default Navbar;
