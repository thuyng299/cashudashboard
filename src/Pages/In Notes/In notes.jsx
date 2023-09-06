import React from "react";
import "../../Components/Forms/InNoteForm.scss";
import InTable from "../../Components/InNoteTable/InTable";
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
        <InTable />
      </div>
    </div>
  );
}
