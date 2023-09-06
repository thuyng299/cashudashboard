import axios from "axios";
import { history } from "../index";
import { isExpired, decodeToken } from "react-jwt";
import { request } from "../Thuy/axios";

export const ACCESS_TOKEN = "accessToken";
export const USER_LOGIN = "userLogin";

export const { saveStore, saveStoreJson, getStore, getStoreJson, removeStore } =
  {
    saveStore: (name, stringValue) => {
      localStorage.setItem(name, stringValue);
      return stringValue;
    },
    saveStoreJson: (name, value) => {
      let sValue = JSON.stringify(value);
      localStorage.setItem(name, sValue);
      return value;
    },
    getStore: (name) => {
      if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
      }
      return null;
    },
    getStoreJson: (name) => {
      if (localStorage.getItem(name)) {
        return JSON.parse(localStorage.getItem(name));
      }
      return null;
    },
    removeStore: (name) => {
      if (localStorage.getItem(name)) {
        localStorage.removeItem(name);
      }
    },
  };

//Cấu hình cho tất các request api

const http = axios.create({
  baseURL: "https://localhost:8080/",
});

axios.interceptors.request.use(
  (config) => {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${getStore(ACCESS_TOKEN)}`,
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signIn = (data) => {
  return request({
    url: "/auth/signin",
    method: "POST",
    data,
  });
};

/* Các status code thường gặp
    200: Request gửi đi và nhận về kết quả thành
    201: request gửi đi thành công và đã được khởi tạo 
    400: bad request => request gửi đi thành công tuy nhiên không tìm thấy dữ liệu từ tham số gửi đi
    404: Not found (Không tìm thấy api đó), hoặc tương tự 400
    401: Unauthorize token không hợp lệ không có quyền truy cập vào api đó
    403: Forbinden token hợp lệ tuy nhiên chưa đủ quyền để truy cập vào api đó
    500: Error server (Lỗi xảy ra trên server có khả năng là frontend gửi dữ liệu chưa hợp lệ dẫn đến backend xử lý bị lỗi). Backend code lỗi trên server ! => Test bằng post man hoặc swagger nếu api không lỗi => front code sai, ngược lại tail fail trên post man và swagger thì báo backend fix.

*/
