import { addNoteCall, removeLabel, updateLabelFromItem } from "./api-calls";

function removeChip(state, belongsTo, itemPara, itemData) {
  const itemLabels = state[belongsTo].filter(
    (item) => item.toLowerCase() !== itemPara.toLowerCase()
  );

  const filterState = state.label.filter(
    (item) =>
      state.labelPages.allLabels.some((item2) =>
        item2.labelName.some(
          (item3) =>
            item.toLowerCase() === item3.toLowerCase() &&
            item2.id !== itemData?.id
        )
      ) || item.toLowerCase() !== itemPara.toLowerCase()
  );

  belongsTo === "labelNotepadChipArr"
    ? updateLabelFromItem(itemData, itemLabels)
    : null;

  !filterState.some((item) => item.toLowerCase() === itemPara.toLowerCase())
    ? removeLabel(itemPara)
    : null;

  return {
    ...state,
    [belongsTo]: itemLabels,
    label: filterState,
  };
}

function labelInputReducer(state, { type, payload }) {
  switch (type) {
    case "ADD_LABEL":
      let labelOb;
      if (
        !state.label.some(
          (item) => item.toLowerCase() === payload.item.toLowerCase()
        ) ||
        !state.label.length
      ) {
        labelOb = { ...state, label: [...state.label, payload.item] };
        addNoteCall({
          belongsTo: "label",
          item: { label: payload.item, id: payload.item },
        });
      } else {
        labelOb = { ...state };
      }

      return !state[payload.belongsTo].some(
        (item) => item.toLowerCase() === payload.item.toLowerCase()
      ) || !state[payload.belongsTo].length
        ? {
            ...labelOb,
            [payload.belongsTo]: [...labelOb[payload.belongsTo], payload.item],
          }
        : { ...labelOb };

    case "ADD_LABEL_ON_FETCH":
      console.log(state, "fetched");
      return { ...state, label: [...payload] };

    case "TOGGLE_CHECKBOX":
      return state[payload.belongsTo].some((item) => item === payload.item)
        ? removeChip(state, payload.belongsTo, payload.item, payload.itemData)
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
      return removeChip(
        state,
        payload.belongsTo,
        payload.item,
        payload.itemData
      );
    case "INITIAL_NOTE_CHIPS":
      return { ...state, labelNotepadChipArr: [...payload] };
    default:
      return state;
  }
}

export { labelInputReducer };
