function removeChip(state, belongsTo, itemPara) {
  return {
    ...state,
    [belongsTo]: state[belongsTo].filter(
      (item) => item.toLowerCase() !== itemPara.toLowerCase()
    ),
    label: state.label.filter((item) => {
      return (
        state.labelPages.allLabels.some((item2) =>
          item2.labelName.some(
            (item3) => item.toLowerCase() === item3.toLowerCase()
          )
        ) || item.toLowerCase() !== itemPara.toLowerCase()
      );
    }),
  };
}

function labelInputReducer(state, { type, payload }) {
  switch (type) {
    case "ADD_LABEL":
      const labelOb =
        !state.label.some(
          (item) => item.toLowerCase() === payload.item.toLowerCase()
        ) || !state.label.length
          ? { ...state, label: [...state.label, payload.item] }
          : { ...state };

      return !state[payload.belongsTo].some(
        (item) => item.toLowerCase() === payload.item.toLowerCase()
      ) || !state[payload.belongsTo].length
        ? {
            ...labelOb,
            [payload.belongsTo]: [...labelOb[payload.belongsTo], payload.item],
          }
        : { ...labelOb };

    case "TOGGLE_CHECKBOX":
      return state[payload.belongsTo].some((item) => item === payload.item)
        ? removeChip(state, payload.belongsTo, payload.item)
        : {
            ...state,
            [payload.belongsTo]: [...state[payload.belongsTo], payload.item],
          };
    case "ALL_LABELED_NOTE":
      const allLabeledNote = payload.filter((item) => item.labelName.length);
      allLabeledNote.sort((a, b) =>
        a.labelName[0] === b.labelName[0]
          ? 0
          : a.labelName[0] > b.labelName[0]
          ? 1
          : -1
      );
      return { ...state, labelPages: { allLabels: [...allLabeledNote] } };

    case "RESET_LABEL_STATE":
      return { ...state, [payload.belongsTo]: [], checkboxInp: [] };
    case "REMOVE_CHIP":
      return removeChip(state, payload.belongsTo, payload.item);
    case "INITIAL_NOTE_CHIPS":
      console.log(payload);
      return { ...state, labelNotepadChipArr: [...payload] };
    default:
      return state;
  }
}

export { labelInputReducer };
