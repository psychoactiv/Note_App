import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { NavigationContextProvider } from "./context/navigation-context";
import { ThemeProvider } from "./context/Theme-context";
import { NoteDataProvider } from "./context/noteData-context";
import { LabelContextProvider } from "./context/label-context";

// Call make Server
// makeServer();

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <NoteDataProvider>
        <LabelContextProvider>
          <NavigationContextProvider>
            <App />
          </NavigationContextProvider>
        </LabelContextProvider>
      </NoteDataProvider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
