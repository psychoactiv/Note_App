import React from "react";

const NoteText = ({ item }) => {
  return (
    <div>
      <h1 className="font-wt-semibold mgn-btm-1 display-block-2rem">
        {item.title}
      </h1>
      <div className="display-block-2rem">{item.note}</div>
    </div>
  );
};

export { NoteText };
