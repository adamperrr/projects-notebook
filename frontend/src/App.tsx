import React from "react";
import { Route, Routes } from "react-router-dom";
import NotesPage from "./pages/notes/NotesPage";

function App() {
  return (
    <Routes>
      <Route path="/:year/:month" element={<NotesPage />} />
      <Route path="*" element={<NotesPage />} />
    </Routes>
  );
}

export default App;
