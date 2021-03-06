import React, { useEffect } from "react";
import { useNoteData } from "../../context/noteData-context";
import { useLabel } from "../../context/label-context";
import "./Label-input.css";

const LabelInput = ({ belongsTo, changeLabelDisplay, item }) => {
  const {
    labelInitial: { label, labelChipArr, labelNotepadChipArr },
    labelDispatch,
  } = useLabel();
  const {
    itemToReduce: { note, archive },
    dispatchNoteList,
  } = useNoteData();
  const HandleLabelVal = (e) => {
    if (e.key === "Enter") {
      labelDispatch({
        type: "ADD_LABEL",
        payload: { item: e.target.value, belongsTo },
      });
    }
  };

  useEffect(() => {
    dispatchNoteList({
      type: "UPDATELABEL",
      payload: { ...item, labelName: [...labelNotepadChipArr] },
    });
  }, [labelNotepadChipArr]);

  useEffect(() => {
    labelDispatch({ type: "ALL_LABELED_NOTE", payload: [...note, ...archive] });
  }, [note, archive]);
  return (
    <div className="label-form">
      <div className="head-inp">
        <h3>Add Label</h3>
        <i
          class="fas fa-times"
          onClick={() =>
            changeLabelDisplay((state) => ({
              ...state,
              id: "",
            }))
          }
        ></i>
      </div>

      <input
        type="text"
        className="user-label-input"
        placeholder="Enter Label"
        onKeyDown={(e) => HandleLabelVal(e)}
      />
      <div className="label-option-box-container">
        {label.map((item) => {
          return (
            <label htmlFor={`${item}-id`} className="flex label-option-box">
              <input
                id={`${item}-id`}
                type="checkbox"
                checked={
                  belongsTo === "labelChipArr"
                    ? labelChipArr.some(
                        (checkItem) =>
                          checkItem.toLowerCase() === item.toLowerCase()
                      )
                    : labelNotepadChipArr.some(
                        (checkItem) =>
                          checkItem.toLowerCase() === item.toLowerCase()
                      )
                }
                name="chip-checkbox"
                onChange={() =>
                  labelDispatch({
                    type: "TOGGLE_CHECKBOX",
                    payload: { item, belongsTo },
                  })
                }
              />
              <div>{item}</div>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export { LabelInput };
