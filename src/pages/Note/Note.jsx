import React, { Fragment, useState } from "react";
import "./Note.css";
import { InputNote } from "../../components/Inputbox/Input";
import { NoteList } from "../../components/noteList/noteList";
import { FilterModal } from "../../components/filterModal/filterModal";

const Note = () => {
  const [openFilter, setOpenFilter] = useState(false);
  return (
    <Fragment>
      <div className="flex note-inp-contain">
        <InputNote />
        {/* <i
          class="fas fa-filter"
          onClick={() => setOpenFilter((state) => !state)}
        ></i> */}
      </div>
      {/* {openFilter ? (
        <FilterModal closeModal={setOpenFilter} />
      ) : (
        <div className="note-icon-details">filter</div>
      )} */}
      <NoteList />
    </Fragment>
  );
};

export { Note };
