import React, { Fragment, useState } from "react";
import "./noteList.css";
import { useNoteData } from "../../context/noteData-context";
import { useNavigation } from "../../context/navigation-context";
import { useLabel } from "../../context/label-context";
import { NoteText } from "../NoteText/NoteText";
import { EditModal } from "../Edit-modal/Edit-Modal";
import { CardColorInput } from "../CardColorInput/CardColorInput";
import { LabelInput } from "../Label-input/Label-input";

const NoteList = () => {
  const { labelDispatch } = useLabel();
  const {
    setEditNote,
    editNote,
    dispatchNoteList,
    finalNoteList,
  } = useNoteData();
  const { listStyle } = useNavigation();
  const [openDisplay, setOpenDisplay] = useState({ id: "" });

  return (
    <div
      className={`note-container  ${
        listStyle ? `listed-display` : `grid-display`
      }`}
    >
      {finalNoteList.map((item) => {
        return (
          <Fragment>
            {editNote.modalVisible && editNote.note.id === item.id ? (
              <EditModal item={item} dispatchType={"note"} />
            ) : null}
            <div
              key={item.id}
              className={`single-note flex jc-sb flex-direct-col ${item.cardColor}`}
            >
              <NoteText
                item={item}
                idToCheck={{
                  itemId: `${item.id}labelInp`,
                  checkDisplay: openDisplay.id,
                }}
              />
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
                  <i
                    className="fas fa-palette grey-color icon-item"
                    onClick={() => setOpenDisplay({ id: `${item.id}colorInp` })}
                  ></i>
                  {openDisplay.id === `${item.id}colorInp` ? (
                    <CardColorInput
                      belongsTo={"notepad"}
                      item={item}
                      closeColorDisplay={setOpenDisplay}
                    />
                  ) : (
                    <div className="note-icon-details">Choose Color</div>
                  )}
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
                  <i
                    className="fas fa-tag grey-color icon-item"
                    onClick={() => {
                      setOpenDisplay({
                        id: `${item.id}labelInp`,
                      });
                      labelDispatch({
                        type: "INITIAL_NOTE_CHIPS",
                        payload: item.labelName,
                      });
                    }}
                  ></i>
                  {`${item.id}labelInp` === openDisplay.id ? (
                    <LabelInput
                      changeLabelDisplay={setOpenDisplay}
                      belongsTo={"labelNotepadChipArr"}
                      item={item}
                    />
                  ) : (
                    <div className="note-icon-details">Tag</div>
                  )}
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
