import React from "react";
import NavBar from "../Components/Navbar/Navbar";
import Footer from "../Components/FooterHome/FooterHome";
import HeaderDashBoard from "../Components/Header/Header";
import DashBoard from "../Pages/Dashboard/Dashboard";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "../Pages/Login/LoginPage";
import "../CSS/scss/styles.css";

export const HomeTemplate = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  if (userLogin) {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "256px 1fr",
          gap: "20px",
        }}
      >
        <div>
          <NavBar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            // height: "100vh",
          }}
        >
          <HeaderDashBoard />

          <div style={{ flex: 1 }}>
            <Outlet />
          </div>
          <Footer />
        </div>
      </div>
    );
  } else {
    return <LoginPage />;
  }
};
