import React, { useState, useEffect } from "react";
import { Container, FormControl } from "@mui/material/";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { v4 as uuidv4 } from "uuid";
import OutNoteTable from "../Tables/OutNoteTable";
import axios from "axios";
import Grid from "@mui/material/Unstable_Grid2";
import "../Forms/OutNoteForm.scss";
import { history } from "../../index";

function OutNoteForm() {
  const [customerData, setcustomerData] = useState([]);
  const [productionData, setproductionData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/customers");
      const sortedcustomerData = response.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setcustomerData(sortedcustomerData);
      console.log("sortedcustomerData ", sortedcustomerData);
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
  };

  const [goodsreceivednotes, setgoodsreceivednotes] = useState({
    customerCode: "",
    record: "",
  });

  const [goodsreceivednotesDTO, setgoodsreceivednotesDTO] = useState({
    customerCode: "",
    record: "",
  });

  const [outgoingDetailsCreateDTOList, setoutgoingDetailsCreateDTOList] =
    useState([
      { id: uuidv4(), productId: "", amount: "", price: "", discount: "" },
    ]);

  const handleChange = (event) => {
    console.log("here1");

    const { name, value } = event.target;

    if (name === "customerCode") {
      const filteredData = customerData.filter((item) => item.name === value);
      console.log("filteredData ", filteredData);
      setgoodsreceivednotes((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));

      setgoodsreceivednotesDTO((prevState) => ({
        ...prevState,
        customerCode: filteredData[0].code,
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

  const handleChangeInput = (id, event) => {
    const newoutgoingDetailsCreateDTOList = outgoingDetailsCreateDTOList.map(
      (i) => {
        if (id === i.id) {
          i[event.target.name] = event.target.value;
        }

        return i;
      }
    );

    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      outgoingDetailsCreateDTOList: outgoingDetailsCreateDTOList,
    };
    setoutgoingDetailsCreateDTOList(newoutgoingDetailsCreateDTOList);

    setgoodsreceivednotes(updatedGoodsReceivedNotes);

    setgoodsreceivednotes((prevState) => ({
      ...prevState,
      outgoingDetailsCreateDTOList: [...outgoingDetailsCreateDTOList],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mergeupdatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      outgoingDetailsCreateDTOList: outgoingDetailsCreateDTOList,
    };

    setgoodsreceivednotes(mergeupdatedGoodsReceivedNotes);
    const mergeupdatedGoodsReceivedNotesDTO = {
      ...goodsreceivednotesDTO,
      outgoingDetailsCreateDTOList: [...outgoingDetailsCreateDTOList],
    };

    setgoodsreceivednotesDTO(mergeupdatedGoodsReceivedNotesDTO);

    const resultMap = outgoingDetailsCreateDTOList.map((item) => {
      if (item.productId !== "") {
        const filteredProductionData = productionData.filter(
          (item1) => item1.name === item.productId
        );
        return {
          ...item,
          productId: filteredProductionData[0].id,
        };
      }
    });

    goodsreceivednotesDTO.outgoingDetailsCreateDTOList = resultMap;
    setgoodsreceivednotesDTO(goodsreceivednotesDTO);

    axios
      .post("http://localhost:8080/goodsdeliverynotes", goodsreceivednotesDTO)
      .then(function (response) {
        alert("Create sucessfull!!!");
        history.push("/outnote");
      })
      .catch(function (error) {
        alert(error);
        alert("Amount & Price & Discount must be greater than 0");
      });
  };

  const [productId, setproductId] = React.useState("");
  const [area, setArea] = React.useState("");

  const handleAddFields = () => {
    setoutgoingDetailsCreateDTOList([
      ...outgoingDetailsCreateDTOList,
      { id: uuidv4(), amount: "", price: "", areaId: "" },
    ]);
    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      outgoingDetailsCreateDTOList: outgoingDetailsCreateDTOList,
    };
    console.log("size InNoteForm: ", outgoingDetailsCreateDTOList.length);
  };

  const handleRemoveFields = (id) => {
    const values = [...outgoingDetailsCreateDTOList];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setoutgoingDetailsCreateDTOList(values);
    const updatedGoodsReceivedNotes = {
      ...goodsreceivednotes,
      outgoingDetailsCreateDTOList: outgoingDetailsCreateDTOList,
    };
    setgoodsreceivednotes(updatedGoodsReceivedNotes);
  };

  return (
    <Grid container spacing={0.5} style={{ width: "100%" }}>
      <Grid xs={6}>
        <Container className="outNoteForm" style={{ height: "auto" }}>
          <Typography className="title">OUT NOTE FORM</Typography>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 1fr)",
                gap: 1,
                marginBottom: 1,
              }}
            >
              <InputLabel id="customer-select-label" className="inputLable">
                Customer Name{" "}
              </InputLabel>
              <Select
                fullWidth
                id="fullWidth"
                labelId="customer-select-label"
                name="customerCode"
                label="Customer Code"
                required={true}
                value={goodsreceivednotes.customerCode}
                onChange={handleChange}
              >
                {customerData.map((item) => (
                  <MenuItem value={item.name}>{item.name}</MenuItem>
                ))}
              </Select>

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
              {outgoingDetailsCreateDTOList.map((incomingDetailsCreateDTO) => (
                <div key={incomingDetailsCreateDTO.id}>
                  <FormControl
                    className="outgoingDetailsCreateDTOList"
                    id="productIdForm"
                  >
                    <Select
                      displayEmpty
                      variant="outlined"
                      required
                      id="productId"
                      name="productId"
                      value={incomingDetailsCreateDTO.id.productId}
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
                    className="outgoingDetailsCreateDTOList"
                    id="amountCodeForm"
                  >
                    <TextField
                      required
                      id="amount"
                      placeholder="Amount(kg)"
                      type="number"
                      name="amount"
                      value={incomingDetailsCreateDTO.amount}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      onChange={(event) =>
                        handleChangeInput(incomingDetailsCreateDTO.id, event)
                      }
                    />
                  </FormControl>

                  <TextField
                    className="outgoingDetailsCreateDTOList"
                    required
                    id="price"
                    placeholder="Price ($)"
                    type="number"
                    name="price"
                    value={incomingDetailsCreateDTO.price}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      handleChangeInput(incomingDetailsCreateDTO.id, event)
                    }
                  />
                  <TextField
                    className="outgoingDetailsCreateDTOList"
                    required
                    id="discount"
                    placeholder="Discount"
                    type="number"
                    name="discount"
                    value={incomingDetailsCreateDTO.discount}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(event) =>
                      handleChangeInput(incomingDetailsCreateDTO.id, event)
                    }
                  />

                  {/* Button */}
                  <IconButton
                    disabled={outgoingDetailsCreateDTOList.length === 1}
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

            {/* ----------------------------------------------------------------- */}
            {/* ----------------------------------------------------------------- */}
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
                // onClick={handleSubmit}
              >
                Create Receipt
              </Button>
            </div>
          </form>
        </Container>
      </Grid>
      <Grid xs={6}>
        <OutNoteTable goodsreceivednotes={goodsreceivednotes} />;
      </Grid>
    </Grid>
  );
}
export default OutNoteForm;
