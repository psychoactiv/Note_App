import React from "react";
import { useNoteData } from "../../context/noteData-context";
import "./CardColorInput.css";

const CardColorInput = ({ belongsTo, addColor, item, closeColorDisplay }) => {
  const { dispatchNoteList } = useNoteData();
  function handleColorSubmit(para) {
    belongsTo === "MAIN_INPUT"
      ? addColor((state) => ({ ...state, cardColor: para }))
      : dispatchNoteList({
          type: "UPDATELABEL",
          payload: { ...item, cardColor: para },
        });
  }
  return (
    <div className="color-tool-box">
      <div className="flex flex-direct-col jc-sa contain-color-box">
        <div className="flex jc-sb">
          <h2 className="basic-color-input-text">Add notepad color</h2>
          <i
            className="fas fa-times"
            onClick={() => closeColorDisplay((state) => ({ ...state, id: "" }))}
          ></i>
        </div>
        <div className="flex color-container jc-sa">
          <button
            className="flex flex-direct-col align-i-center"
            value="color-red"
            onClick={() => handleColorSubmit("color-red")}
          >
            <div className="color-common color-red"></div>
            <div className="basic-color-input-text">RED</div>
          </button>
          <button
            className="flex flex-direct-col align-i-center"
            value="color-orange"
            onClick={() => handleColorSubmit("color-orange")}
          >
            <div className="color-common color-orange"></div>
            <div className="basic-color-input-text">ORANGE</div>
          </button>
          <button
            className="flex flex-direct-col align-i-center"
            value="color-yellow"
            onClick={() => handleColorSubmit("color-yellow")}
          >
            <div className="color-common color-yellow"></div>
            <div className="basic-color-input-text">YELLOW</div>
          </button>
          <button
            className="flex flex-direct-col align-i-center"
            value="color-green"
            onClick={() => handleColorSubmit("color-green")}
          >
            <div className="color-common color-green"></div>
            <div className="basic-color-input-text">GREEN</div>
          </button>
          <button
            className="flex flex-direct-col align-i-center"
            value="color-blue"
            onClick={() => handleColorSubmit("color-blue")}
          >
            <div className="color-common color-blue"></div>
            <div className="basic-color-input-text">BLUE</div>
          </button>
          <button
            className="flex flex-direct-col align-i-center"
            onClick={() => handleColorSubmit("color-default")}
          >
            <div className="color-common color-default"></div>
            <div className="basic-color-input-text">DEFAULT</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { CardColorInput };
