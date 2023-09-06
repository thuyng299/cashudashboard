import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

const LetterAvatar = () => {
  return (
    <Avatar
      style={{
        backgroundColor: "#87d068",
        fontSize: "24px", // Increase the font size
        width: "40px", // Increase the width
        height: "40px", // Increase the height
      }}
      icon={<UserOutlined />}
    />
  );
};

export default LetterAvatar;
