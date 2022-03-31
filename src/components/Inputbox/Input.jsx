import React, { useReducer } from "react";
import { shouldExpand, initialInpState } from "../../utils/user-inp-reducerfn";
import "./input.css";

const InputNote = () => {
  const [displayInp, dispatchInpVal] = useReducer(
    shouldExpand,
    initialInpState
  );

  function HandleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form
      className="input-box-holder"
      onSubmit={HandleSubmit}
      onFocus={() => {
        dispatchInpVal({ type: "EXPAND", payload: true });
      }}
    >
      <input
        type="text"
        placeholder="Title"
        className={`title-text ${
          displayInp.openStatus ? `block-display` : `title-text`
        } font-wt-semibold`}
        onBlur={() => dispatchInpVal({ type: "TITLE", payload: false })}
        onFocus={() => dispatchInpVal({ type: "TITLE", payload: true })}
      />
      <input
        type="text"
        placeholder="Take a note"
        onBlur={() => dispatchInpVal({ type: "NOTE_TEXT", payload: false })}
        onFocus={() => dispatchInpVal({ type: "NOTE_TEXT", payload: true })}
      />
      <div className="flex inp-utils-space">
        <button
          className="user-inp-btn-close"
          onClick={() => dispatchInpVal({ type: "COLAPASE", payload: false })}
        >
          close
        </button>
      </div>
    </form>
  );
};

export { InputNote };
