import React, {
  useContext,
  createContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { noteListReducerfn } from "../utils/noteListReducerfn";
import {
  filterNoteReducer,
  InitialFilterState,
} from "../utils/filterNoteReducer";
import { compose, filterFnList } from "../utils/filterFnList";
import api from "../api/notes-api";

const NoteDataContext = createContext(null);

const NoteDataProvider = ({ children }) => {
  const [itemToReduce, dispatchNoteList] = useReducer(noteListReducerfn, {
    note: [],
    trash: [],
    archive: [],
  });
  const [editNote, setEditNote] = useState({ note: {}, modalVisible: false });
  const [filteredNote, setFilteredNote] = useReducer(
    filterNoteReducer,
    InitialFilterState
  );

  useEffect(() => {
    (async () => {
      try {
        const recievedList = await api.get("/notes");
        const trashRecieved = await api.get("/trashed");
        const archiveRecieved = await api.get("/archive");

        dispatchNoteList({
          type: "LISTING",
          payload: {
            note: recievedList.data.map((item) => ({
              ...item,
              dateAndTime: new Date(item.dateAndTime),
            })),
            trash: trashRecieved.data.map((item) => ({
              ...item,
              dateAndTime: new Date(item.dateAndTime),
            })),
            archive: archiveRecieved.data.map((item) => ({
              ...item,
              dateAndTime: new Date(item.dateAndTime),
            })),
          },
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const finalNoteList = compose(
    filteredNote,
    filterFnList
  )({ archive: itemToReduce.archive, note: itemToReduce.note });

  return (
    <NoteDataContext.Provider
      value={{
        itemToReduce,
        dispatchNoteList,
        setEditNote,
        editNote,
        filteredNote,
        setFilteredNote,
        finalNoteList,
      }}
    >
      {children}
    </NoteDataContext.Provider>
  );
};

const useNoteData = () => useContext(NoteDataContext);

export { NoteDataProvider, useNoteData };
