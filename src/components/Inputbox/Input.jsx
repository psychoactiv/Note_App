import React, { useState } from "react";
import "./input.css";

const InputNote = () => {
  const [displayInp, setDisplayInp] = useState(false);

  function HandleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form className="input-box-holder" onSubmit={HandleSubmit}>
      <input
        type="text"
        placeholder="Title"
        className={`${
          displayInp ? `block-display` : `title-text`
        } font-wt-semibold`}
      />
      <input
        type="text"
        placeholder="Take a note"
        onFocus={() => setDisplayInp(true)}
      />
      <div className="flex inp-utils-space">
        <button
          className="user-inp-btn-close"
          onClick={() => setDisplayInp(false)}
        >
          close
        </button>
      </div>
    </form>
  );
};

export { InputNote };
