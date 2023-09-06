import React from "react";
import { Layout, Avatar } from "antd";
import LetterAvatar from "../Avatar/Avatar";
import SearchBar from "../Search/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import "../../CSS/scss/styles.scss";
const { Header, Content, Sider } = Layout;

const { Footer } = Layout;

const HeaderDashBoard = () => {
  const { userLogin } = useSelector((state) => state.userReducer);

  return (
    <Header
      style={{
        display: "flex",
        height: "60px",
        alignItems: "center",
        borderRadius: "20px",
        backgroundColor: "transparent",
        justifyContent: "center",
      }}
    >
      <div style={{ flex: 1 }}></div>

      <div style={{ flex: 1 }}></div>
      <div
        style={{
          flex: 0.4,
          color: "white",
          fontWeight: "1000",
        }}
      >
        <p
          style={{
            alignItems: "center",
            textAlign: "center",
            verticalAlign: "center",
            height: "40px",
            backgroundColor: "grey",
            borderRadius: "10px",
          }}
          id="Hello"
        >
          <span>Hello! {userLogin.employeeName}</span>
        </p>
      </div>
      <div style={{ flex: 0.2, textAlign: "right" }}>
        <LetterAvatar />{" "}
      </div>
      {/* <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]} /> */}
    </Header>
  );
};

export default HeaderDashBoard;
