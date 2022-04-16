import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarProvider } from "./pages/notes/contexts/CalendarContext";
import { ProjectModalProvider } from "./pages/notes/contexts/ProjectModalContext";
import NotesPage from "./pages/notes/NotesPage";

function App() {
  return (
    <CalendarProvider>
      <ProjectModalProvider>
        <Routes>
          <Route path="/:year/:month" element={<NotesPage />} />
          <Route path="*" element={<NotesPage />} />
        </Routes>
      </ProjectModalProvider>
    </CalendarProvider>
  );
}

export default App;
