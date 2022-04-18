import React from "react";
import { LabelChips } from "../label-chips/label-chips";

const NoteText = ({ item }) => {
  return (
    <div>
      <h1 className="font-wt-semibold mgn-btm-1 display-block-2rem">
        {item.title}
      </h1>
      <div className="display-block-2rem">{item.note}</div>
      {item.labelName.length ? <LabelChips labelList={item.labelName} /> : null}
    </div>
  );
};

export { NoteText };
