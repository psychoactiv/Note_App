import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
} from "react";
import { v4 } from "uuid";
import { labelInputReducer } from "../utils/labelInputReducer";
import api from "../api/notes-api";

const LabelContext = createContext(null);

const LabelContextProvider = ({ children }) => {
  const [sideBarData, setSideBarData] = useState([
    {
      id: v4(),
      path: "/",
      name: "Notes",
      singleLabel: false,
      icon: `far fa-lightbulb`,
    },
    {
      id: v4(),
      path: "/label",
      name: "All Tags",
      singleLabel: false,
      icon: `fas fa-tag`,
    },
    {
      id: v4(),
      path: "/archive",
      name: "Archive",
      singleLabel: false,
      icon: `fas fa-archive`,
    },
    {
      id: v4(),
      path: "/trash",
      name: "Trash",
      singleLabel: false,
      icon: `fas fa-trash`,
    },
  ]);
  const [labelInitial, labelDispatch] = useReducer(labelInputReducer, {
    label: [],
    checkboxInp: [],
    labelChipArr: [],
    labelNotepadChipArr: [],
    labelPages: {
      allLabels: [],
    },
  });

  useEffect(() => {
    (async () => {
      const getLabels = await api.get("/label");
      const archiveRecieved = await api.get("/archive");
      const recievedList = await api.get("/notes");
      const allNotes = [...archiveRecieved.data, ...recievedList.data];
      const payload = getLabels.data.filter((item) =>
        allNotes.some((item2) =>
          item2.labelName.some(
            (item3) => item3.toLowerCase() === item.label.toLowerCase()
          )
        )
      );
      labelDispatch({
        type: "ADD_LABEL_ON_FETCH",
        payload: payload.map((item) => item.label),
      });
    })();
  }, []);

  return (
    <LabelContext.Provider
      value={{
        labelInitial,
        labelDispatch,
        sideBarData,
        setSideBarData,
        labelInitial,
      }}
    >
      {children}
    </LabelContext.Provider>
  );
};

const useLabel = () => useContext(LabelContext);

export { LabelContextProvider, useLabel };
