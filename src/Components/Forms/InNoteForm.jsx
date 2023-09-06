import React, { useState, useEffect } from "react";
import { Container, FormControl } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Icon from "@mui/material/Icon";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import { makeStyles } from "@mui/styles/";
import { v4 as uuidv4 } from "uuid";
import OutlinedInput from "@mui/material/OutlinedInput";
import InNoteTable2 from "../Tables/InNoteTable2";
import { history } from "../../index";
import "../../CSS/scss/styles.scss";
import "../../Components/Forms/InNoteForm.scss";
import { auto } from "@popperjs/core";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { format } from "date-fns";
import dayjs from "dayjs";

function InNoteForm() {
  const today = dayjs();
  const [supplierData, setsupplierData] = useState([]);
  const [productionData, setproductionData] = useState([]);
  const [areaData, setareaData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/suppliers");
      const sortedSupplierData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setsupplierData(sortedSupplierData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await axios.get("http://localhost:8080/products");
      const productionData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setproductionData(productionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    try {
      const response = await axios.get("http://localhost:8080/warehouseareas");
      const areaData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setareaData(areaData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [goodsreceivednotes, setgoodsreceivednotes] = useState({
    supplierCode: "",
    incomingDate: new Date().toLocaleDateString(),
    record: "",
  });
  console.log("goodsreceivednotes ", goodsreceivednotes);
  const [goodsreceivednotesDTO, setgoodsreceivednotesDTO] = useState({
    supplierCode: "",
    incomingDate: new Date().toLocaleDateString(),
    record: "",
  });

  const [incomingDetailsCreateDTOList, setincomingDetailsCreateDTOList] =
    useState([
      { id: uuidv4(), productCode: "", amount: "", cost: "", areaId: "" },
    ]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "supplierCode") {
      const filteredData = supplierData.filter((item) => item.name === value);

      setgoodsreceivednotes((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      setgoodsreceivednotesDTO((prevState) => ({
        ...prevState,
        supplierCode: filteredData[0].code,
      }));
    } else {
      setgoodsreceivednotes((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      setgoodsreceivednotesDTO((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (date) => {
    console.log("date ", date);
    goodsreceivednotesDTO.incomingDate = dayjs(date).format(
      "YYYY-MM-DD HH:mm:ss"
    );

    setgoodsreceivednotes((prevState) => ({
      ...prevState,
      incomingDate: new Date(date).toLocaleDateString(),
    }));

    console.log("formattedDate ", goodsreceivednotesDTO.incomingDate);
  };

  const handleChangeInput = (id, event) => {
    const newincomingDetailsCreateDTOList = incomingDetailsCreateDTOList.map(
      (i) => {
        if (id === i.id) {
          i[event.target.name] = event.target.value;
        }

        return i;
      }
    );

    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      incomingDetailsCreateDTOList: incomingDetailsCreateDTOList,
    };
    setincomingDetailsCreateDTOList(newincomingDetailsCreateDTOList);

    setgoodsreceivednotes(updatedGoodsReceivedNotes);

    setgoodsreceivednotes((prevState) => ({
      ...prevState,
      incomingDetailsCreateDTOList: [...incomingDetailsCreateDTOList],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mergeupdatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      incomingDetailsCreateDTOList: incomingDetailsCreateDTOList,
    };

    setgoodsreceivednotes(mergeupdatedGoodsReceivedNotes);
    const mergeupdatedGoodsReceivedNotesDTO = {
      ...goodsreceivednotesDTO,
      incomingDetailsCreateDTOList: [...incomingDetailsCreateDTOList],
    };

    setgoodsreceivednotesDTO(mergeupdatedGoodsReceivedNotesDTO);

    const resultMap = incomingDetailsCreateDTOList.map((item) => {
      if (item.productCode !== "") {
        const filteredProductionData = productionData.filter(
          (item1) => item1.name === item.productCode
        );

        return {
          ...item,
          productCode: filteredProductionData[0].code,
        };
      }
    });
    const resultMap2 = resultMap.map((item) => {
      if (item.areaId !== "") {
        const filteredAreaData = areaData.filter(
          (item1) => item1.name === item.areaId
        );

        return {
          ...item,
          areaId: filteredAreaData[0].id,
        };
      }
    });
    console.log("resultMap2", resultMap2);

    goodsreceivednotesDTO.incomingDetailsCreateDTOList = resultMap2;
    setgoodsreceivednotesDTO(goodsreceivednotesDTO);

    axios
      .post("http://localhost:8080/goodsreceivednotes", goodsreceivednotesDTO)
      .then(function (response) {
        console.log(response);

        alert("Create sucessfull!!!");
        history.push("/innote");
      })
      .catch(function (error) {
        console.log(error);
        alert("Amount & Cost must be greater than 0");
      });
  };

  const [productCode, setproductCode] = React.useState("");
  const [area, setArea] = React.useState("");

  const handleAddFields = () => {
    setincomingDetailsCreateDTOList([
      ...incomingDetailsCreateDTOList,
      { id: uuidv4(), amount: "", cost: "", areaId: "" },
    ]);
    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      incomingDetailsCreateDTOList: incomingDetailsCreateDTOList,
    };
    console.log("size InNoteForm: ", incomingDetailsCreateDTOList.length);
  };

  const handleRemoveFields = (id) => {
    const values = [...incomingDetailsCreateDTOList];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setincomingDetailsCreateDTOList(values);
    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      incomingDetailsCreateDTOList: incomingDetailsCreateDTOList,
    };
    setgoodsreceivednotes(updatedGoodsReceivedNotes);
  };

  return (
    <Grid container spacing={0.5} style={{ width: "100%" }}>
      <Grid xs={6}>
        <Container className="inNoteForm" style={{ height: "auto" }}>
          <Typography className="title">IN NOTE FORM</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: 1,
                marginBottom: 1,
              }}
            >
              <Grid container style={{ width: "100%" }}>
                <Grid xs={8}>
                  <InputLabel id="supplier-select-label" className="inputLable">
                    Supplier Name
                  </InputLabel>
                  <Select
                    fullWidth
                    id="fullWidth"
                    labelId="supplier-select-label"
                    name="supplierCode"
                    label="Supplier Name"
                    required={true}
                    value={goodsreceivednotes.supplierCode}
                    onChange={handleChange}
                  >
                    {supplierData.map((item) => (
                      <MenuItem value={item.name}>{item.name}</MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid xs={4}>
                  <div
                    style={{
                      marginLeft: "30px",
                      alignItems: "right",
                    }}
                  >
                    <InputLabel
                      id="supplier-select-label"
                      className="inputLable"
                    >
                      Date
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        required
                        disableFuture
                        defaultValue={today}
                        className="incomingDate"
                        // value={goodsreceivednotes.incomingDate}
                        onChange={handleDateChange}
                      />
                    </LocalizationProvider>
                  </div>
                </Grid>
              </Grid>
              <InputLabel id="note-select-label" className="inputLable">
                Note (Optional)
              </InputLabel>

              <TextField
                id="record"
                name="record"
                variant="outlined"
                multiline
                value={goodsreceivednotes.record}
                onChange={handleChange}
              />
            </Box>

            <br />

            <Box
              sx={{
                display: "grid",
                gridTemplateRows: "repeat(2, 1fr)",
                rowGap: 1,
              }}
            >
              {incomingDetailsCreateDTOList.map((incomingDetailsCreateDTO) => (
                <div key={incomingDetailsCreateDTO.id}>
                  <FormControl
                    className="incomingDetailsCreateDTOList"
                    id="productCodeForm"
                  >
                    <Select
                      displayEmpty
                      variant="outlined"
                      required
                      id="productCode"
                      name="productCode"
                      value={incomingDetailsCreateDTO.id.productCode}
                      onChange={(event) =>
                        handleChangeInput(incomingDetailsCreateDTO.id, event)
                      }
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return (
                            <span
                              style={{ color: "#a89f9f", fontSize: "1rem" }}
                            >
                              Production Name
                            </span>
                          );
                        }

                        return selected;
                      }}
                    >
                      {productionData.map((item) => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    className="incomingDetailsCreateDTOList"
                    id="amountCodeForm"
                  >
                    <TextField
                      required
                      id="amount"
                      name="amount"
                      placeholder="Amount(kg)"
                      type="number"
                      value={incomingDetailsCreateDTO.amount}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        handleChangeInput(incomingDetailsCreateDTO.id, event)
                      }
                    />
                  </FormControl>
                  <FormControl
                    className="incomingDetailsCreateDTOList"
                    id="costForm"
                  >
                    <TextField
                      required
                      id="cost"
                      placeholder="Cost ($)"
                      type="number"
                      name="cost"
                      value={incomingDetailsCreateDTO.cost}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        handleChangeInput(incomingDetailsCreateDTO.id, event)
                      }
                    />
                  </FormControl>

                  <FormControl
                    className="incomingDetailsCreateDTOList"
                    id="areaFormControl"
                  >
                    <Select
                      displayEmpty
                      variant="outlined"
                      required
                      name="areaId"
                      id="areaId"
                      value={incomingDetailsCreateDTO.area}
                      onChange={(event) =>
                        handleChangeInput(incomingDetailsCreateDTO.id, event)
                      }
                      renderValue={(selected) => {
                        if (selected === undefined) {
                          return (
                            <span
                              style={{ color: "#a89f9f", fontSize: "1rem" }}
                            >
                              Area Name
                            </span>
                          );
                        }

                        return selected;
                      }}
                    >
                      {areaData.map((item) => (
                        <MenuItem value={item.name}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <IconButton
                    disabled={incomingDetailsCreateDTOList.length === 1}
                    onClick={() =>
                      handleRemoveFields(incomingDetailsCreateDTO.id)
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton onClick={handleAddFields}>
                    <AddIcon />
                  </IconButton>
                </div>
              ))}
            </Box>

            <div
              style={{
                textAlign: "center",
                marginBottom: "0px",
                marginTop: "20px",
              }}
            >
              <Button
                sx={{
                  background: "black",
                  alignContent: "center",
                }}
                className="inNoteButton"
                variant="contained"
                color="primary"
                type="submit"
              >
                Create Receipt
              </Button>
            </div>
          </form>
        </Container>
      </Grid>
      <Grid xs={6}>
        <InNoteTable2 goodsreceivednotes={goodsreceivednotes} />;
      </Grid>
    </Grid>
  );
}
export default InNoteForm;
