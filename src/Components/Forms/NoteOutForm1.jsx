import { useFormik } from "formik";
import * as Yup from "yup";
import { Card } from "antd";
import { useDispatch, useSelector } from "react-redux";

import "../../CSS/scss/innotes.css";
import "../../CSS/scss/styles.scss";
const NoteOutForm1 = () => {
  const { userLogin } = useSelector((state) => state.userReducer);
  console.log(userLogin);

  const formik = useFormik({
    initialValues: {
      supplierCode: "",
      productCode: "",
      amount: "",
      cost: "",
      areaCost: "",
      note: "",
    },
    validationSchema: Yup.object({
      supplierCode: Yup.string(),
      // .required("Required")
      // .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      password: Yup.string()
        .required("Required")
        .matches(
          /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
          "Password must be 7-19 characters and contain at least one letter, one number and a special character"
        ),
      confirmedPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      phone: Yup.string()
        .required("Required")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Must be a valid phone number"
        ),
    }),
    onSubmit: (values) => {
      window.alert("Successful!!!");
      console.log(values);
    },
  });

  return (
    <Card title="IN NOTE FORM" bordered={false} id="inCard">
      {" "}
      <form className="infoform" onSubmit={formik.handleSubmit}>
        <label> Supplier Code </label>
        <input
          className="inNoteInput"
          type="text"
          id="supplierCode"
          name="supplierCode"
          value={formik.values.supplierCode}
          onChange={formik.handleChange}
          placeholder="Enter Supplier Code"
        />
        {formik.errors.supplierCode && (
          <p className="errorMsg"> {formik.errors.supplierCode} </p>
        )}
        <label> Product Code </label>
        <input
          className="inNoteInput"
          type="text"
          id="productCode"
          name="productCode"
          value={formik.values.productCode}
          onChange={formik.handleChange}
          placeholder="Enter Product Code"
        />
        {formik.errors.productCode && (
          <p className="errorMsg"> {formik.errors.productCode} </p>
        )}
        <label> Amount </label>
        <input
          className="inNoteInput"
          type="text"
          id="amount"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          placeholder="Enter Amount"
        />
        {formik.errors.amount && (
          <p className="errorMsg"> {formik.errors.amount} </p>
        )}
        <label> Cost </label>
        <input
          className="inNoteInput"
          type="text"
          id="cost"
          name="cost"
          value={formik.values.cost}
          onChange={formik.handleChange}
          placeholder="Enter Cost"
        />
        {formik.errors.cost && (
          <p className="errorMsg"> {formik.errors.cost} </p>
        )}
        <label> Area Code </label>
        <input
          className="inNoteInput"
          type="text"
          id="areaCode"
          name="areaCode"
          value={formik.values.areaCode}
          onChange={formik.handleChange}
          placeholder="Enter Area Code"
        />
        {formik.errors.areaCode && (
          <p className="errorMsg"> {formik.errors.areaCode} </p>
        )}
        <label> Note </label>
        <input
          className="inNoteInput"
          type="text"
          id="note"
          name="note"
          value={formik.values.note}
          onChange={formik.handleChange}
          placeholder="Write description"
        />
        {formik.errors.note && (
          <p className="errorMsg"> {formik.errors.note} </p>
        )}
        <button type="submit" id="inButton">
          {" "}
          Create{" "}
        </button>
      </form>
    </Card>
  );
};

export default NoteOutForm1;
