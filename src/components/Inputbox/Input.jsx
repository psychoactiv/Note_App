import React, { useState, useEffect } from "react";
import { useNoteData } from "../../context/noteData-context";
import { useLabel } from "../../context/label-context";
import { v4 as uuidv4 } from "uuid";
import { LabelInput } from "../Label-input/Label-input";
import { LabelChips } from "../label-chips/label-chips";
import { CardColorInput } from "../CardColorInput/CardColorInput";
import "./input.css";

const InputNote = () => {
  const [displayInp, setDisplayInp] = useState({
    expandInp: false,
    id: "",
  });
  const [inpValue, setInpValue] = useState({
    title: "",
    note: "",
    id: uuidv4(),
    labelName: [],
    date: "",
    cardColor: "plain",
    isArchived: false,
    priority: 0,
  });
  const { dispatchNoteList } = useNoteData();
  const {
    labelInitial: { labelChipArr, labelPages },
    labelDispatch,
  } = useLabel();

  function HandleSubmit(e) {
    e.preventDefault();
    if (inpValue.isArchived) {
      dispatchNoteList({
        type: "ADD_NOTE",
        payload: { item: { ...inpValue }, belongsTo: "archive" },
      });
    } else if (!inpValue.isArchived) {
      dispatchNoteList({
        type: "ADD_NOTE",
        payload: { item: { ...inpValue }, belongsTo: "note" },
      });
    }
    labelDispatch({
      type: "RESET_LABEL_STATE",
      payload: { belongsTo: "labelChipArr" },
    });
    setInpValue({
      title: "",
      note: "",
      id: uuidv4(),
      labelName: [],
      date: "",
      cardColor: "plain",
      isArchived: false,
      priority: 0,
    });
    setDisplayInp({ expandInp: false, id: "" });
  }
  useEffect(() => {
    setInpValue((state) => ({
      ...state,
      labelName: [...labelChipArr],
    }));
  }, [labelChipArr]);
  return (
    <div className="input-box-holder">
      <input
        type="text"
        placeholder="Title"
        value={inpValue.title}
        onChange={(e) =>
          setInpValue((state) => ({ ...state, title: e.target.value }))
        }
        className={`${
          displayInp.expandInp ? `block-display` : `title-text`
        } font-wt-semibold box-inp`}
      />
      <input
        onChange={(e) =>
          setInpValue((state) => ({ ...state, note: e.target.value }))
        }
        type="text"
        value={inpValue.note}
        className="box-inp"
        placeholder="Take a note"
        onClick={() =>
          setDisplayInp((state) => ({ ...state, expandInp: true }))
        }
      />
      {inpValue.labelName.length ? (
        <LabelChips labelList={inpValue.labelName} />
      ) : null}
      <div
        className={`inp-utils-space ${
          displayInp.expandInp ? `flex ` : `title-text`
        }`}
      >
        <div className="note-option flex jc-sb">
          <div className="note-icon-container">
            <i
              className="fas fa-tag grey-color icon-item"
              onClick={() =>
                setDisplayInp((state) => ({
                  ...state,
                  id: `${inpValue.id}labelInp`,
                }))
              }
            ></i>
            {displayInp.id === `${inpValue.id}labelInp` ? (
              <LabelInput
                changeLabelDisplay={setDisplayInp}
                belongsTo={"labelChipArr"}
              />
            ) : (
              <div className="note-icon-details">Tag</div>
            )}
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
              <div className="note-icon-details">Archive</div>
            )}
          </div>
          <div className="note-icon-container">
            <i
              className="fas fa-palette grey-color icon-item"
              onClick={() =>
                setDisplayInp((state) => ({
                  ...state,
                  id: `${inpValue.id}colorInp`,
                }))
              }
            ></i>
            {displayInp.id === `${inpValue.id}colorInp` ? (
              <CardColorInput
                belongsTo={"MAIN_INPUT"}
                addColor={setInpValue}
                closeColorDisplay={setDisplayInp}
              />
            ) : (
              <div className="note-icon-details">bg color</div>
            )}
          </div>
        </div>
        <div className="input-fate">
          <div
            className="user-inp-btn-close"
            onClick={() =>
              setDisplayInp((state) => ({ ...state, expandInp: false }))
            }
          >
            close
          </div>
          <button
            className="user-inp-btn-close"
            onClick={(e) => HandleSubmit(e)}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export { InputNote };
