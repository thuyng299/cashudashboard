import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

const FooterHome = () => {
  return (
    <Footer
      style={{
        display: "flex",
        justifyContent: "center", // Căn giữa theo chiều ngang
        alignItems: "center", // Căn giữa theo chiều dọc
        borderRadius: "20px",
        fontWeight: "bold",
        fontStyle: "italic",
        height: "3vh",
        padding: "0",
        backgroundColor: "rgba(255,255,255,0.5)",
      }}
    >
      © 2023 Cashu Company. All rights reserved. Website designed by Tan Nguyen
      & Thuy Nguyen.
    </Footer>
  );
};

export default FooterHome;
