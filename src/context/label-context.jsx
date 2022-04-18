import React, { createContext, useContext, useState, useReducer } from "react";
import { labelInputReducer } from "../utils/labelInputReducer";

const LabelContext = createContext(null);

const LabelContextProvider = ({ children }) => {
  const [labelInitial, labelDispatch] = useReducer(labelInputReducer, {
    label: [],
    checkboxInp: [],
    labelChipArr: [],
    labelNotepadChipArr: [],
    labelPages: {
      allLabels: [],
    },
  });

  return (
    <LabelContext.Provider value={{ labelInitial, labelDispatch }}>
      {children}
    </LabelContext.Provider>
  );
};

const useLabel = () => useContext(LabelContext);

export { LabelContextProvider, useLabel };
