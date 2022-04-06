import React, { useState } from "react";
import { useNoteData } from "../../context/noteData-context";
import { v4 as uuidv4 } from "uuid";
import "./input.css";

const InputNote = () => {
  const [displayInp, setDisplayInp] = useState(false);
  const [inpValue, setInpValue] = useState({
    title: "",
    note: "",
    id: "",
    labelName: "",
    date: "",
    cardColor: "plain",
    isArchived: false,
    priority: 0,
  });
  const { dispatchNoteList } = useNoteData();

  function HandleSubmit(e) {
    e.preventDefault();
    console.log(inpValue);
    if (inpValue.isArchived) {
      dispatchNoteList({
        type: "ADD_NOTE",
        payload: { item: { ...inpValue, id: uuidv4() }, belongsTo: "archive" },
      });
    } else if (!inpValue.isArchived) {
      dispatchNoteList({
        type: "ADD_NOTE",
        payload: { item: { ...inpValue, id: uuidv4() }, belongsTo: "note" },
      });
    }
    setInpValue({
      title: "",
      note: "",
      id: "",
      labelName: "",
      date: "",
      cardColor: "plain",
      isArchived: false,
      priority: 0,
    });
    setDisplayInp(false);
  }

  return (
    <form className="input-box-holder" onSubmit={HandleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={inpValue.title}
        onChange={(e) =>
          setInpValue((state) => ({ ...state, title: e.target.value }))
        }
        className={`${
          displayInp ? `block-display` : `title-text`
        } font-wt-semibold`}
      />
      <input
        onChange={(e) =>
          setInpValue((state) => ({ ...state, note: e.target.value }))
        }
        type="text"
        value={inpValue.note}
        placeholder="Take a note"
        onFocus={() => setDisplayInp(true)}
      />
      <div className={`inp-utils-space ${displayInp ? `flex ` : `title-text`}`}>
        <div className="note-option flex jc-sb">
          <div className="note-icon-container">
            <i className="fas fa-tag grey-color icon-item"></i>
            <div className="note-icon-details">Tag</div>
          </div>
          <div
            className="note-icon-container"
            onClick={() =>
              setInpValue((state) => ({
                ...state,
                isArchived: !state.isArchived,
              }))
            }
          >
            <i
              className={`fas fa-archive ${
                inpValue.isArchived ? `Archive-clicked` : `grey-color`
              } icon-item`}
            ></i>
            {inpValue.isArchived ? (
              <div className="note-icon-details">Remove from Archive</div>
            ) : (
              <div className="note-icon-details"> Archive</div>
            )}
          </div>
          <div className="note-icon-container">
            <i className="fas fa-palette grey-color icon-item"></i>
            <div className="note-icon-details">bg color</div>
          </div>
        </div>
        <div className="input-fate">
          <div
            className="user-inp-btn-close"
            onClick={() => setDisplayInp(false)}
          >
            close
          </div>
          <button className="user-inp-btn-close">save</button>
        </div>
      </div>
    </form>
  );
};

export { InputNote };
