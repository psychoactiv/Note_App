import React, { useState, useEffect } from "react";
import { useLabel } from "../../context/label-context";
import { useNoteData } from "../../context/noteData-context";
import "./filterModal.css";

const FilterModal = ({ closeModal }) => {
  const {
    setFilteredNote,
    filteredNote: { labelMatch },
    itemToReduce: { note, archive },
  } = useNoteData();
  const {
    labelInitial: { label },
    labelDispatch,
  } = useLabel();

  useEffect(() => {
    labelDispatch({ type: "ALL_LABELED_NOTE", payload: [...note, ...archive] });
  }, [note, archive]);
  return (
    <div className="filter-modal">
      <h3 className="text-style">Filters</h3>
      <div className="flex filter-container">
        <div className="label-container">
          <h3 className="text-style">Filter by label</h3>
          {label.length ? (
            label.map((item) => (
              <label
                htmlFor={`${item}-id`}
                className="flex label-option-box flex-wrap"
              >
                <input
                  id={`${item}-id`}
                  type="checkbox"
                  checked={labelMatch.some((arr) => arr === item)}
                  onChange={() =>
                    setFilteredNote({ type: "LABELFILTER", payload: item })
                  }
                />
                <div className="text-style">{item}</div>
              </label>
            ))
          ) : (
            <div className="text-style">No Labels added</div>
          )}
        </div>
        <div className="filter-containers">
          <label className="flex align-i-center col-gap-1">
            <input
              type="radio"
              name="SORTBYCREATED"
              onClick={() =>
                setFilteredNote({
                  type: "SORTBYCREATED",
                  payload: "FIRSTCREATED",
                })
              }
            />
            <div className="text-style">Sort by first created</div>
          </label>
          <label className="flex align-i-center col-gap-1">
            <input
              type="radio"
              name="SORTBYCREATED"
              onClick={() =>
                setFilteredNote({
                  type: "SORTBYCREATED",
                  payload: "LASTCREATED",
                })
              }
            />
            <div className="text-style">Sort by last created</div>
          </label>
        </div>
        <div className="filter-containers">
          <h3 className="text-style">Filter by priority</h3>
          <label className="flex align-i-center col-gap-1">
            <input
              type="checkbox"
              name="SORTBYCREATED"
              onClick={() =>
                setFilteredNote({
                  type: "PRIORITY",
                  payload: "HIGH PRIORITY",
                })
              }
            />
            <div className="text-style">HIGH PRIORITY</div>
          </label>
          <label className="flex align-i-center col-gap-1">
            <input
              type="checkbox"
              name="SORTBYCREATED"
              onClick={() =>
                setFilteredNote({
                  type: "PRIORITY",
                  payload: "MEDIUM PRIORITY",
                })
              }
            />
            <div className="text-style">MEDIUM PRIORITY</div>
          </label>
          <label className="flex align-i-center col-gap-1">
            <input
              type="checkbox"
              name="SORTBYCREATED"
              onClick={() =>
                setFilteredNote({
                  type: "PRIORITY",
                  payload: "LOW PRIORITY",
                })
              }
            />
            <div className="text-style">LOW PRIORITY</div>
          </label>
        </div>
      </div>
      <div className="flex update-action-btn-container">
        <button onClick={() => closeModal(false)}>Close</button>
      </div>
    </div>
  );
};

export { FilterModal };
