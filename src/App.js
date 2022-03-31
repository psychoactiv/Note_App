import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Archive, Label, Trash } from "./pages";
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
              <Route path="/" element={<Home />} />
              <Route path="/" element={<Archive />} />
              <Route path="/" element={<Label />} />
              <Route path="/" element={<Trash />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
