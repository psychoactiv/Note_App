import api from "../api/notes-api";

const addNoteCall = async (payload) => {
  if (payload.belongsTo === "note") {
    try {
      await api.post("/notes", { ...payload.item });
    } catch (err) {
      console.log(`Your data was not added in the server because of` + err);
    }
  } else if (payload.belongsTo === "archive") {
    try {
      await api.post("/archive", { ...payload.item });
    } catch (err) {
      console.log(`Your data was not added in the server because of` + err);
    }
  }
};

const updateNoteCall = async (payload) => {
  if (payload.belongsTo === "note") {
    try {
      await api.put(`/notes/${payload.item.id}`, payload.item);
    } catch (err) {
      console.log(`Your data was not updated in the server because of` + err);
    }
  } else if (payload.belongsTo === "archive") {
    try {
      await api.put(`/archive/${payload.item.id}`, payload.item);
    } catch (err) {
      console.log(`Your data was not updated in the server because of` + err);
    }
  }
};

const addToTrashCall = async (payload) => {
  if (payload.belongsTo === "note") {
    try {
      await api
        .delete(`/notes/${payload.item.id}`)
        .then(() => api.post("/trashed", payload.item));
    } catch (err) {
      console.log(
        ` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API ` +
          err
      );
    }
  } else if (payload.belongsTo === "archive") {
    try {
      await api
        .delete(`/archive/${payload.item.id}`)
        .then(() => api.post("/trashed", payload.item));
    } catch (err) {
      console.log(
        ` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API ` +
          err
      );
    }
  }
};

const restoreFromTrash = async (payload) => {
  if (payload.belongsTo === "trash") {
    try {
      await api
        .delete(`/trashed/${payload.item.id}`)
        .then(() => api.post(`/notes/`, payload.item));
    } catch (err) {
      console.log(
        ` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API ` +
          err
      );
    }
  } else if (payload.belongsTo === "archive") {
    try {
      await api
        .delete(`/archive/${payload.item.id}`)
        .then(() => api.post(`/notes/`, payload.item));
    } catch (err) {
      console.log(
        ` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API ` +
          err
      );
    }
  }
};

const deleteAll = async (payload) => {
  try {
    await api.delete(`/trashed/${payload.id}`);
  } catch (err) {
    console.log(
      ` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API ` +
        err
    );
  }
};

const moveToArchive = async (payload) => {
  if (payload.belongsTo === "note") {
    try {
      await api
        .delete(`/notes/${payload.item.id}`)
        .then(() => api.post(`/archive`, payload.item));
    } catch (err) {
      console.log(` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API  
    ${err}`);
    }
  } else if (payload.belongsTo === "trash") {
    try {
      await api
        .delete(`/trashed/${payload.item.id}`)
        .then(() => api.post(`/archive`, payload.item));
    } catch (err) {
      console.log(` JSONtypicode sometimes calls delete api 2 times please check if it's updated in the API  
    ${err}`);
    }
  }
};

export {
  addNoteCall,
  updateNoteCall,
  addToTrashCall,
  restoreFromTrash,
  deleteAll,
  moveToArchive,
};
