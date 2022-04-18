import React, {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { noteListReducerfn } from "../utils/noteListReducerfn";
import api from "../api/notes-api";

const NoteDataContext = createContext(null);

const NoteDataProvider = ({ children }) => {
  const [itemToReduce, dispatchNoteList] = useReducer(noteListReducerfn, {
    note: [],
    noteBackup:[],
    trash: [],
    archive: [],
  });
  const [editNote, setEditNote] = useState({ note: {}, modalVisible: false });

  useEffect(() => {
    (async () => {
      try {
        const recievedList = await api.get("/notes");
        const trashRecieved = await api.get("/trashed");
        const archiveRecieved = await api.get("/archive");
        dispatchNoteList({
          type: "LISTING",
          payload: {
            note: [...recievedList.data],
            trash: [...trashRecieved.data],
            archive: [...archiveRecieved.data],
          },
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <NoteDataContext.Provider
      value={{ itemToReduce, dispatchNoteList, setEditNote, editNote }}
    >
      {children}
    </NoteDataContext.Provider>
  );
};

const useNoteData = () => useContext(NoteDataContext);

export { NoteDataProvider, useNoteData };
