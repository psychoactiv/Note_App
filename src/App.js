import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Note, Archive, Label, Trash } from "./pages";
import { Navbar, Sidebar } from "./components";
import { useNavigation } from "./context/navigation-context";
import { useTheme } from "./context/Theme-context";
import { useLabel } from "./context/label-context";
import { SingleLabel } from "./pages/SingleLabel/SingleLabel";

function App() {
  const { labelInitial } = useLabel();
  const {
    theme: { decideTheme },
  } = useTheme();
  const { initialDisplay } = useNavigation();
  return (
    <BrowserRouter>
      <div app-theme={decideTheme} className="whole-App">
        <Navbar />
        <div className="flex align-same-class">
          <div className="sidebar-container">
            <Sidebar />
          </div>
          <div
            className={`page-container ${
              initialDisplay.displayByHover ? "adjust-content-width" : ""
            }`}
          >
            <Routes>
              <Route path="/" element={<Note />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="/label" element={<Label />} />
              {labelInitial.label.map((item) => (
                <Route
                  path={`/${item}`}
                  element={<SingleLabel label={item} />}
                />
              ))}
              <Route path="/trash" element={<Trash />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
