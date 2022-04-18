import React from "react";
import "./label-chips.css";
import { useLabel } from "../../context/label-context";
import { v4 as uuidv4 } from "uuid";

const LabelChips = ({ labelList }) => {
  const { labelDispatch } = useLabel();
  return (
    <div className="chips-container">
      {labelList.map((item) => {
        return (
          <div key={uuidv4()} className="single-chip">
            <div>{item}</div>
            <i
              class="fas fa-times"
              onClick={() =>
                labelDispatch({
                  type: "REMOVE_CHIP",
                  payload: { belongsTo: "labelChipArr", item },
                })
              }
            ></i>
          </div>
        );
      })}
    </div>
  );
};

export { LabelChips };
