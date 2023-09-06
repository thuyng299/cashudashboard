import axios from "axios";

export const request = axios.create({
  baseURL: "http://localhost:8080/",
});

request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem("USER_INFO_KEY");

  if (userInfo) {
    userInfo = JSON.parse(userInfo);

    config.headers.Authorization = `Bearer ${userInfo.token}`;

    config.headers["Roles"] = userInfo.roles;
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {}
);
