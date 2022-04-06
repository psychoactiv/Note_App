import {
  addNoteCall,
  updateNoteCall,
  addToTrashCall,
  restoreFromTrash,
  deleteAll,
  moveToArchive,
  deleteFromArchive,
  addingToNote,
  addingToTrash,
} from "../utils/api-calls";

function noteListReducerfn(state, { type, payload }) {
  switch (type) {
    case "LISTING":
      return {
        ...state,
        note: [...state.note, ...payload.note],
        trash: [...state.trash, ...payload.trash],
        archive: [...state.archive, ...payload.archive],
      };
    case "ADD_NOTE":
      addNoteCall(payload);
      return {
        ...state,
        [payload.belongsTo]: [...state[payload.belongsTo], { ...payload.item }],
      };
    case "UPDATE_NOTE":
      updateNoteCall(payload);
      const newArr = state[payload.belongsTo].map((item) =>
        item.id === payload.item.id ? { ...payload.item } : item
      );
      return { ...state, [payload.belongsTo]: [...newArr] };
    case "ADD_TO_TRASH":
      console.log(payload);
      addToTrashCall(payload);
      const removeFromNotes = state[payload.belongsTo].filter(
        (item) => item.id !== payload.item.id
      );
      return {
        ...state,
        trash: [...state.trash, payload.item],
        [payload.belongsTo]: [...removeFromNotes],
      };
    case "MOVE_TO_NOTE":
      console.log(payload);
      restoreFromTrash({
        ...payload,
        item: { ...payload.item, isArchived: false },
      });
      const removeRestorItem = state[payload.belongsTo].filter(
        (item) => item.id !== payload.item.id
      );
      return {
        ...state,
        note: [...state.note, { ...payload.item, isArchived: false }],
        [payload.belongsTo]: [...removeRestorItem],
      };
    case "DELETE":
      deleteAll(payload);
      const deleteFromArr = state.trash.filter(
        (item) => item.id !== payload.id
      );
      return {
        ...state,
        trash: [...deleteFromArr],
      };
    case "MOVE_TO_ARCHIVE":
      console.log(payload);
      const archiveArr = { ...payload.item, isArchived: true };
      moveToArchive({ item: archiveArr, belongsTo: payload.belongsTo });
      const willMoveToArchive = state[payload.belongsTo].filter(
        (item) => item.id !== payload.item.id
      );
      return {
        ...state,
        archive: [...state.archive, archiveArr],
        [payload.belongsTo]: [...willMoveToArchive],
      };
  }
}

export { noteListReducerfn };
