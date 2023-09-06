import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@mui/styles/";
import { TablePagination } from "@mui/material";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
// import { GridFilterOperator } from "@mui/x-data-grid";

import axios from "axios";
import "../../CSS/scss/styles.scss";

const useStyles = makeStyles({
  root: {},
  cell: {
    fontFamily: "Poppins, sans-serif",
  },
  headerCell: {
    fontWeight: "bold",
    fontSize: 15,
    border: "1px solid grey",
    width: 120,
    fontFamily: "Poppins, sans-serif",
  },
});

export default function InTable() {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inData, setInData] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/goodsdeliverynotes"
      );
      const productionData = response.data.sort((a, b) =>
        b.outgoingDate.localeCompare(a.outgoingDate)
      );
      setInData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(inData);

  function Row(props) {
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow
          style={{
            "& > *": { borderBottom: "unset" },
          }}
        >
          <TableCell className={classes.root}>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell
            className={classes.cell}
            style={{ fontSize: 16 }}
            align="center"
          >
            {props.row.code}
          </TableCell>
          <TableCell
            className={classes.cell}
            style={{ fontSize: 16 }}
            align="center"
          >
            {props.row.customerName}
          </TableCell>
          <TableCell
            className={classes.cell}
            style={{ fontSize: 16 }}
            align="center"
          >
            {props.row.outgoingDate}
          </TableCell>
          <TableCell
            className={classes.cell}
            style={{ fontSize: 16 }}
            align="center"
          >
            {props.row.employeeName}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            className={classes.cell}
            style={{ paddingBottom: 0, paddingTop: 0 }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box
                sx={{
                  margin: 2,
                  alignItems: "center",
                  pl: "20px",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow
                      style={{
                        background: "#e3c099",
                      }}
                    >
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 120,
                        }}
                        align="left"
                      >
                        Product Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 80,
                        }}
                        align="left"
                      >
                        Area Name
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 80,
                        }}
                        align="center"
                      >
                        Incoming Date
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 50,
                        }}
                        align="right"
                      >
                        Total Amount
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 50,
                        }}
                        align="center"
                      >
                        Price ($)
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: "bold",
                          fontSize: 15,
                          border: "1px solid grey",
                          width: 30,
                        }}
                        align="center"
                      >
                        Discount (%)
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {props.row.outgoingDetailsCreateDTOList.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell
                          align="left"
                          style={{ border: "1px solid grey" }}
                        >
                          {product.productName}
                        </TableCell>
                        <TableCell
                          align="left"
                          style={{
                            border: "1px solid grey",
                          }}
                        >
                          {product.areaName}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{
                            border: "1px solid grey",
                          }}
                        >
                          {product.incomingDate}
                        </TableCell>
                        <TableCell
                          align="right"
                          style={{ border: "1px solid grey" }}
                        >
                          {product.amount.toLocaleString()}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ border: "1px solid grey" }}
                        >
                          {product.price}
                        </TableCell>
                        <TableCell
                          align="center"
                          style={{ border: "1px solid grey" }}
                        >
                          {product.discount * 100}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, inData.length - page * rowsPerPage);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead style={{ background: "#6b3e2e" }}>
          <TableRow>
            <TableCell>
              {" "}
              <Button
                variant="contained"
                component={Link}
                to="/outnoteform"
                // color="secondary"
                style={{ backgroundColor: "#78764f" }}
              >
                Create New
              </Button>
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: 23, color: "white" }}
              align="center"
            >
              Note Code
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: 23, color: "white" }}
              align="center"
            >
              Customer Name
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: 23, color: "white" }}
              align="center"
            >
              Shipping Date
            </TableCell>
            <TableCell
              style={{ fontWeight: "bold", fontSize: 23, color: "white" }}
              align="center"
            >
              Employee Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? inData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : inData
          ).map((row) => (
            <Row key={row.code} row={row} />
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={inData.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
