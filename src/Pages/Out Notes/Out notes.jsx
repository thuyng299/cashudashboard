import React from "react";
import OutNoteForm from "../../Components/Forms/OutNoteForm";
import Grid from "@mui/material/Unstable_Grid2";
import "../../Components/Forms/InNoteForm.scss";
import OutTable from "../../Components/InNoteTable/OutTable";
import HeaderOutNote from "../../Components/Header/HeaderOutnote";
export default function Innote() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flex: 1, marginTop: 10 }}>
        <OutTable />
      </div>
    </div>
  );
}
