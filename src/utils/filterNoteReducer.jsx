const InitialFilterState = {
  labelMatch: [],
  sortByPriority: [],
  colorMatch: [],
  sortByCreated: "",
};

function filterNoteReducer(state, { type, payload }) {
  switch (type) {
    case "LABELFILTER":
      return state.labelMatch.some(
        (inArr) => payload.toLowerCase() === inArr.toLowerCase()
      )
        ? {
            ...state,
            labelMatch: state.labelMatch.filter(
              (filterteditem) => filterteditem !== payload
            ),
          }
        : { ...state, labelMatch: [...state.labelMatch, payload] };
    case "SORTBYCREATED":
      return { ...state, sortByCreated: payload };
    case "PRIORITY":
      return state.sortByPriority.some(
        (item) => item.toLowerCase() === payload.toLowerCase()
      )
        ? {
            ...state,
            sortByPriority: state.sortByPriority.filter(
              (item) => item !== payload
            ),
          }
        : { ...state, sortByPriority: [...state.sortByPriority, payload] };
    case "COLORMATCH":
      return;
    case "RESET":
      return InitialFilterState;
    default:
      return state;
  }
}

export { InitialFilterState, filterNoteReducer };
