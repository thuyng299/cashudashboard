import React from "react";
import OutNoteForm from "../../Components/Forms/OutNoteForm";
import "../../Components/Forms/InNoteForm.scss";

export default function OutnoteFormPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div style={{ flex: 1, marginTop: 10 }}>
        <OutNoteForm />
      </div>
    </div>
  );
}
