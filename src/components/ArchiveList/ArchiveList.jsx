import React, { Fragment } from "react";
import { useNoteData } from "../../context/noteData-context";
import { useNavigation } from "../../context/navigation-context";
import { EditModal } from "../Edit-modal/Edit-Modal";
import { NoteText } from "../NoteText/NoteText";

const ArchiveList = () => {
  const {
    itemToReduce: { archive },
    dispatchNoteList,
    setEditNote,
    editNote,
  } = useNoteData();

  const { listStyle } = useNavigation();

  return (
    <div
      className={`note-container  ${
        listStyle ? `listed-display` : `grid-display`
      }`}
    >
      {archive.length ? (
        archive.map((item) => {
          return (
            <Fragment>
              {editNote.modalVisible && editNote.note.id === item.id ? (
                <EditModal item={item} dispatchType={"archive"} />
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
                  <div
                    className="note-icon-container"
                    onClick={() =>
                      dispatchNoteList({
                        type: "MOVE_TO_NOTE",
                        payload: { item, belongsTo: "archive" },
                      })
                    }
                  >
                    <i class="far fa-lightbulb grey-color"></i>
                    <div className="note-icon-details">Move back to notes</div>
                  </div>
                  <div className="note-icon-container">
                    <i className="fas fa-palette grey-color icon-item"></i>
                    <div className="note-icon-details">Choose Color</div>
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
                        payload: { item, belongsTo: "archive" },
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
        <h1>Nothing in the archive</h1>
      )}
    </div>
  );
};

export { ArchiveList };
