import React, { Fragment } from "react";
import { InputNote } from "../../components/Inputbox/Input";
import { NoteList } from "../../components/noteList/noteList";

const Note = () => {
  return (
    <Fragment>
      <InputNote />
      <NoteList />
    </Fragment>
  );
};

export { Note };
