import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarProvider } from "./pages/notes/contexts/CalendarContext";
import NotesPage from "./pages/notes/NotesPage";

function App() {
  return (
    <CalendarProvider>
      <Routes>
        <Route path="/:year/:month" element={<NotesPage />} />
        <Route path="*" element={<NotesPage />} />
      </Routes>
    </CalendarProvider>
  );
}

export default App;
