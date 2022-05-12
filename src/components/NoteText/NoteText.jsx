import React, { useEffect } from "react";
import { LabelChips } from "../label-chips/label-chips";
import { DateAndPriority } from "../DateAndPriority/DateAndPriority";
import "./NoteText.css";

const NoteText = ({ item, idToCheck }) => {
  return (
    <div className="NoteTextContainer">
      <h1 className="font-wt-semibold mgn-btm-1 display-block-2rem">
        {item.title}
      </h1>
      <div className="display-block-2rem">{item.note}</div>
      {item?.labelName?.length ? (
        <LabelChips
          labelList={item}
          belongsTo={"labelNotepadChipArr"}
          idToCheck={idToCheck}
        />
      ) : null}
      <DateAndPriority item={item} payload={item} />
    </div>
  );
};

export { NoteText };
