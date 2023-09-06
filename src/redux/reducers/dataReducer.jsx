import { createSlice } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
const initialState = [];

const chartDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_CHART_DATA":
      return action.payload;
    default:
      return state;
  }
};

export default chartDataReducer;

export function CompanyInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/countries");
      dispatch({ type: "SET_CHART_DATA", payload: response.data });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return null;
}
