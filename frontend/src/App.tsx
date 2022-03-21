import React from "react";
import { Route, Routes } from "react-router-dom";
import NotesPage from "./pages/notes/NotesPage";

function App() {
  return (
    <Routes>
      <Route path="/:year/:month" element={<NotesPage />} />
      <Route path="/" element={<NotesPage />} />
      {/* <Route path=":invoiceId" element={<Invoice />} /> */}

      {/* <Route
      path="*"
      element={
        <main style={{ padding: "1rem" }}>
          <p>There's nothing here!</p>
        </main>
      }
    /> */}
    </Routes>
  );
}

export default App;
