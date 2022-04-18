import React from "react";
import { useNoteData } from "../../context/noteData-context";
import { NoteText } from "../NoteText/NoteText";
import { useNavigation } from "../../context/navigation-context";
import "../noteList/noteList.css";

const TrashList = () => {
  const {
    itemToReduce: { trash },
    dispatchNoteList,
  } = useNoteData();

  const { listStyle } = useNavigation();

  return (
    <div
      className={`note-container  ${
        listStyle ? `listed-display` : `grid-display`
      }`}
    >
      {trash.length ? (
        trash.map((item) => {
          return (
            <div
              key={item.id}
              className={`single-note flex jc-sb flex-direct-col ${item.cardColor}`}
            >
              <NoteText item={item} />
              <div className="flex icon-container-shift-left">
                <div
                  className="note-icon-container"
                  onClick={() => {
                    if (item.isArchived) {
                      dispatchNoteList({
                        type: "MOVE_TO_ARCHIVE",
                        payload: { item, belongsTo: "trash" },
                      });
                    } else {
                      dispatchNoteList({
                        type: "MOVE_TO_NOTE",
                        payload: { item, belongsTo: "trash" },
                      });
                    }
                  }}
                >
                  <i class="fas fa-trash-restore grey-color"></i>
                  <div className="note-icon-details">Restore</div>
                </div>
                <div
                  className="note-icon-container"
                  onClick={() =>
                    dispatchNoteList({
                      type: "DELETE",
                      payload: item,
                    })
                  }
                >
                  <i className="fas fa-trash grey-color"></i>
                  <div className="note-icon-details">Delete</div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1>Nothing in the trash</h1>
      )}
    </div>
  );
};

export { TrashList };
