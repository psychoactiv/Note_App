import React, { Fragment, useEffect, useState } from "react";
import { useLabel } from "../../context/label-context";
import { useNoteData } from "../../context/noteData-context";
import { useNavigation } from "../../context/navigation-context";
import { NoteText } from "../NoteText/NoteText";
import { CardColorInput } from "../CardColorInput/CardColorInput";
import { EditModal } from "../Edit-modal/Edit-Modal";
import { LabelInput } from "../Label-input/Label-input";

const LabelList = ({ labelDisplay }) => {
  const {
    itemToReduce: { note, archive },
    setEditNote,
    editNote,
    dispatchNoteList,
  } = useNoteData();
  const { labelDispatch } = useLabel();
  const { listStyle } = useNavigation();
  const [display, setDisplay] = useState({ id: "" });

  useEffect(() => {
    labelDispatch({ type: "ALL_LABELED_NOTE", payload: [...note, ...archive] });
  }, [note, archive]);

  return (
    <div
      className={`note-container  ${
        listStyle ? `listed-display` : `grid-display`
      }`}
    >
      {labelDisplay.length ? (
        labelDisplay.map((item) => {
          return (
            <Fragment>
              {editNote.modalVisible && editNote.note.id === item.id ? (
                <EditModal
                  item={item}
                  dispatchType={item.isArchived ? "archive" : "note"}
                />
              ) : null}
              <div
                key={item.id}
                className={`single-note flex jc-sb flex-direct-col ${item.cardColor}`}
              >
                <NoteText
                  item={item}
                  idToCheck={{
                    itemId: `${item.id}labelInp`,
                    checkDisplay: display.id,
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
                      onClick={() => setDisplay({ id: `${item.id}colorInp` })}
                    ></i>
                    {display.id === `${item.id}colorInp` ? (
                      <CardColorInput
                        belongsTo={"notepad"}
                        item={item}
                        closeColorDisplay={setDisplay}
                      />
                    ) : (
                      <div className="note-icon-details">Choose Color</div>
                    )}
                  </div>
                  <div
                    className="note-icon-container"
                    onClick={() =>
                      dispatchNoteList({
                        type: item.isArchived
                          ? "MOVE_TO_NOTE"
                          : "MOVE_TO_ARCHIVE",
                        payload: {
                          item,
                          belongsTo: item.isArchived ? "archive" : "note",
                        },
                      })
                    }
                  >
                    <i className="fas fa-archive grey-color icon-item"></i>
                    {item.isArchived ? (
                      <div className="note-icon-details">
                        Remove from Archive
                      </div>
                    ) : (
                      <div className="note-icon-details"> Archive</div>
                    )}
                  </div>
                  <div className="note-icon-container">
                    <i
                      className="fas fa-tag grey-color icon-item"
                      onClick={() => {
                        setDisplay({
                          id: `${item.id}labelInp`,
                        });
                        labelDispatch({
                          type: "INITIAL_NOTE_CHIPS",
                          payload: item.labelName,
                        });
                      }}
                    ></i>
                    {`${item.id}labelInp` === display.id ? (
                      <LabelInput
                        changeLabelDisplay={setDisplay}
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
                        payload: {
                          item,
                          belongsTo: item.isArchived ? "archive" : "note",
                        },
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
        })
      ) : (
        <div>No labels added</div>
      )}
    </div>
  );
};

export { LabelList };
