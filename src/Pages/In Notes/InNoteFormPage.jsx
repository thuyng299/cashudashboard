import React from "react";
import InNoteForm from "../../Components/Forms/InNoteForm";
import Grid from "@mui/material/Unstable_Grid2";
import "../../Components/Forms/InNoteForm.scss";
import InNoteTable2 from "../../Components/Tables/InNoteTable2";

import HeaderHome from "../../Components/Header/HeaderHome";
export default function InnoteFormPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flex: 1, marginTop: 10 }}>
        <InNoteForm />
      </div>
    </div>
  );
}
