import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { loginApi } from "../../redux/reducers/userReducer";
import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../../Components/Login/Login.scss";
import Box from "@mui/material/Box";

export const Login = () => {
  const dispatch = useDispatch();

  const form = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object().shape({
      username: yup.string().required("Username cannot be blank!"),
      password: yup.string().when("username", {
        is: (username) => username && username.length > 0,
        then: yup.string().required("Password cannot be blank!"),
        otherwise: yup.string(),
      }),
    }),

    onSubmit: (values) => {
      const actionAsync = loginApi(values);
      dispatch(actionAsync);
    },
  });

  return (
    <>
      {" "}
      <form
        className="formLogin "
        onSubmit={form.handleSubmit}
        style={{ backgroundColor: "rgb(220, 200, 200)", padding: "80px" }}
      >
        <h1 className="login">Login</h1>

        <div className="form-group emailLogin">
          <Box id="userinput">
            <TextField
              type="text"
              label="Username"
              className="form-control"
              size="medium"
              name="username"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.username && (
              <p className="text-danger">{form.errors.username}</p>
            )}
          </Box>
        </div>
        <div className="form-group passwordLogin">
          <Box id="passwordinput">
            <TextField
              type="password"
              label="Password"
              className="form-control"
              name="password"
              onChange={form.handleChange}
              onBlur={form.handleBlur}
            />
            {form.errors.password && (
              <p className="text-danger">{form.errors.password}</p>
            )}
          </Box>
        </div>
        <div className="form-group submitLogin">
          <Button
            variant="contained"
            size="large"
            type="submit"
            style={{ backgroundColor: "black" }}
          >
            LOGIN
          </Button>
        </div>
      </form>
    </>
  );
};
