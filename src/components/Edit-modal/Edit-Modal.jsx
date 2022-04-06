import React, { useState } from "react";
import { useNoteData } from "../../context/noteData-context";

import "./Edit-modal.css";

const EditModal = ({ item, dispatchType }) => {
  const { setEditNote, dispatchNoteList } = useNoteData();
  const [inpValue, setInpValue] = useState({ ...item });
  return (
    <div className="edit-modal">
      <div className="update-input-container">
        <legend>EDIT NOTE</legend>
        <input
          placeholder="Enter new Title"
          className="title-text-inp"
          value={inpValue.title}
          onChange={(e) =>
            setInpValue((state) => ({ ...state, title: e.target.value }))
          }
        />
        <input
          placeholder="Enter new note"
          className="note-text-input"
          value={inpValue.note}
          onChange={(e) =>
            setInpValue((state) => ({ ...state, note: e.target.value }))
          }
        />
        <div className="flex jc-center update-action-btn-container">
          <button
            onClick={() => {
              dispatchNoteList({
                type: "UPDATE_NOTE",
                payload: { item: inpValue, belongsTo: dispatchType },
              });
              setEditNote({
                note: { ...item },
                modalVisible: false,
              });
            }}
          >
            Update
          </button>
          <button
            onClick={() =>
              setEditNote({
                note: { ...item },
                modalVisible: false,
              })
            }
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export { EditModal };
