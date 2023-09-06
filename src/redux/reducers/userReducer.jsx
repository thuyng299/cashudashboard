import { createSlice } from "@reduxjs/toolkit";
import { history } from "../../index";
import { signIn } from "../../util/config";
import {
  ACCESS_TOKEN,
  http,
  getStoreJson,
  saveStore,
  saveStoreJson,
  USER_LOGIN,
} from "../../util/config";

const initialState = {
  userLogin: getStoreJson(USER_LOGIN),
};

const userReducer = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.userLogin = action.payload;
    },
  },
});

export const { loginAction } = userReducer.actions;

export default userReducer.reducer;

export const loginApi = (userLogin) => {
  return async (dispatch) => {
    const result = await signIn(userLogin);

    const action = loginAction(result.data);
    dispatch(action);
    saveStoreJson(USER_LOGIN, result.data);
    saveStore(ACCESS_TOKEN, result.data.token);
    alert("Login Successful!");
    history.push("/dashboard");
  };
};
