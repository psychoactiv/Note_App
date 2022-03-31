import React from "react";
import { useTheme } from "../../context/Theme-context";
import "../../index.css";

const Trash = () => {
  const {
    theme: { decideTheme },
  } = useTheme();
  return <div app-theme={decideTheme}>Trash</div>;
};

export { Trash };
