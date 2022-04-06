import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { NavigationContextProvider } from "./context/navigation-context";
import { ThemeProvider } from "./context/Theme-context";
import { NoteDataProvider } from "./context/noteData-context";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <NoteDataProvider>
        <NavigationContextProvider>
          <App />
        </NavigationContextProvider>
      </NoteDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
