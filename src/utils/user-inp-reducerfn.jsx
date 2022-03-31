const initialInpState = {
  openStatus: false,
  titleInp: false,
  textInp: false,
};

const checkDisplay = (state) => state.titleInp && state.textInp;

function shouldExpand(state, { type, payload }) {
  switch (type) {
    case "EXPAND":
      return { ...state, openStatus: payload };
    case "TITLE":
      return checkDisplay({ ...state, titleInp: payload })
        ? initialInpState
        : { ...state, titleInp: payload };
    case "NOTE_TEXT":
      return checkDisplay({ ...state, textInp: payload })
        ? initialInpState
        : { ...state, textInp: payload };
    case "COLAPASE":
      return { ...initialInpState };
    default:
      return state;
  }
}

export { initialInpState, shouldExpand };
