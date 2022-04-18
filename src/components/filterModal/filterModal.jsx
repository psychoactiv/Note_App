import React, { useState } from "react";
import { useLabel } from "../../context/label-context";
import { useNoteData } from "../../context/noteData-context";
import "./filterModal.css";

const FilterModal = ({ closeModal }) => {
  const { dispatchNoteList } = useNoteData();
  const {
    labelInitial: {
      label,
      labelPages: { allLabels },
    },
  } = useLabel();
  const [filteredLabel, setFilteredLabel] = useState([]);
  function HandleSubmit() {
    const filteredLabels = allLabels.filter((item) =>
      item.labelName.some((singleLabel) => {
        console.log(singleLabel);
        return filteredLabel.some((labelTOCheck) => {
          console.log(singleLabel, labelTOCheck);
          return singleLabel.toLowerCase() === labelTOCheck.toLowerCase();
        });
      })
    );
    console.log(filteredLabel);
    // dispatchNoteList({ type: "LABELFILTER", payload: filteredLabel });
  }
  return (
    <div className="filter-modal">
      {label.length ? (
        label.map((item) => (
          <label
            htmlFor={`${item}-id`}
            className="flex label-option-box flex-wrap"
          >
            <input
              id={`${item}-id`}
              type="checkbox"
              checked={filteredLabel.some((arr) => (arr = label))}
              onChange={() =>
                setFilteredLabel((state) =>
                  state.some(
                    (inArr) => item.toLowerCase() === inArr.toLowerCase()
                  )
                    ? state.filter((filterteditem) => filterteditem !== item)
                    : [...state, item]
                )
              }
            />
            <div>{item}</div>
          </label>
        ))
      ) : (
        <div>No Labels added</div>
      )}
      <div className="flex update-action-btn-container">
        <button onClick={() => HandleSubmit()}>apply</button>
        <button onClick={() => closeModal(false)}>Close</button>
      </div>
    </div>
  );
};

export { FilterModal };
