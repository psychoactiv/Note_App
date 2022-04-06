import React, { Fragment, useState } from "react";
import "./noteList.css";
import { useNoteData } from "../../context/noteData-context";
import { useNavigation } from "../../context/navigation-context";
import { NoteText } from "../NoteText/NoteText";
import { EditModal } from "../Edit-modal/Edit-Modal";

const NoteList = () => {
  const {
    itemToReduce: { note },
    setEditNote,
    editNote,
    dispatchNoteList,
  } = useNoteData();
  const { listStyle } = useNavigation();

  function grow() {
    console.log(itemToReduce);
  }

  return (
    <div
      className={`note-container  ${
        listStyle ? `listed-display` : `grid-display`
      }`}
    >
      <button onClick={grow}>Check</button>
      {note.map((item) => {
        return (
          <Fragment>
            {editNote.modalVisible && editNote.note.id === item.id ? (
              <EditModal item={item} dispatchType={"note"} />
            ) : null}
            <div
              key={item.id}
              className="single-note flex jc-sb flex-direct-col"
            >
              <NoteText item={item} />
              <div className="icon-note-container">
                <div
                  className="note-icon-container"
                  onClick={() =>
                    setEditNote({
                      note: { ...item },
                      modalVisible: true,
                    })
                  }
                >
                  <i class="fas fa-edit grey-color"></i>
                  <div className="note-icon-details">Edit Note</div>
                </div>
                <div className="note-icon-container">
                  <i className="fas fa-palette grey-color icon-item"></i>
                  <div className="note-icon-details">Choose Color</div>
                </div>
                <div
                  className="note-icon-container"
                  onClick={() =>
                    dispatchNoteList({
                      type: "MOVE_TO_ARCHIVE",
                      payload: { item, belongsTo: "note" },
                    })
                  }
                >
                  <i className="fas fa-archive grey-color icon-item"></i>
                  <div className="note-icon-details">Archive</div>
                </div>
                <div className="note-icon-container">
                  <i className="fas fa-tag grey-color icon-item"></i>
                  <div className="note-icon-details">Tag</div>
                </div>
                <div
                  className="note-icon-container"
                  onClick={() =>
                    dispatchNoteList({
                      type: "ADD_TO_TRASH",
                      payload: { item, belongsTo: "note" },
                    })
                  }
                >
                  <i className="fas fa-trash grey-color"></i>
                  <div className="note-icon-details">Trash</div>
                </div>
              </div>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export { NoteList };
