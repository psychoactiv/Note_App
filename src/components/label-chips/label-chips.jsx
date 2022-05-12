import React, { useEffect } from "react";
import "./label-chips.css";
import { useLabel } from "../../context/label-context";
import { useNoteData } from "../../context/noteData-context";
import { v4 as uuidv4 } from "uuid";

const LabelChips = ({ labelList, belongsTo, idToCheck }) => {
  const { labelDispatch } = useLabel();
  const {
    itemToReduce: { note, archive },
  } = useNoteData();

  useEffect(() => {
    labelDispatch({ type: "ALL_LABELED_NOTE", payload: [...note, ...archive] });
  }, [note, archive]);

  return (
    <div className="chips-container">
      {labelList.labelName.map((item) => {
        return (
          <div key={uuidv4()} className="single-chip">
            <div className="chip-note">{item}</div>
            {belongsTo === "labelChipArr" ||
            idToCheck?.itemId === idToCheck?.checkDisplay ? (
              <i
                class="fas fa-times"
                onClick={() =>
                  labelDispatch({
                    type: "REMOVE_CHIP",
                    payload: { belongsTo, item, itemData: labelList },
                  })
                }
              ></i>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export { LabelChips };
