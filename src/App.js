import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Note, Archive, Label, Trash } from "./pages";
import { Navbar, Sidebar } from "./components";
import { useTheme } from "./context/Theme-context";

function App() {
  const {
    theme: { decideTheme },
  } = useTheme();
  return (
    <BrowserRouter>
      <div app-theme={decideTheme} className="whole-App">
        <Navbar />
        <div className="flex">
          <Sidebar />
          <div className="page-container">
            <Routes>
              <Route path="/" element={<Note />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/label" element={<Label />} />
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
