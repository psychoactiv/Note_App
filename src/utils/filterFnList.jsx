const filterLabel = (state, data) => {
  const hasLabels = [...data.note, ...data.archive].filter(
    (item) => item.labelName.length
  );
  return state.labelMatch.length
    ? hasLabels.filter((item) =>
        item.labelName.some((singleLabel) =>
          state.labelMatch.some((labelTOCheck) => {
            return singleLabel.toLowerCase() === labelTOCheck.toLowerCase();
          })
        )
      )
    : [...data.note];
};

const sortByCreated = (state, data) => {
  let allData = [...data];
  if (state.sortByCreated === "FIRSTCREATED")
    allData = allData.sort(
      (a, b) =>
        new Date(a.dateAndTime).getTime() - new Date(b.dateAndTime).getTime()
    );
  else if (state.sortByCreated === "LASTCREATED")
    allData = allData.sort(
      (a, b) =>
        new Date(b.dateAndTime).getTime() - new Date(a.dateAndTime).getTime()
    );
  return allData;
};

const priorityFn = (state, data) => {
  console.log(state, data);
  return state.sortByPriority.length
    ? data.filter((item) =>
        state.sortByPriority.some((item2) => item2 === item.priority)
      )
    : data;
};

const compose = (state, functionList) => (data) =>
  functionList.reduce((acum, cur) => cur(state, acum), data);

const filterFnList = [filterLabel, sortByCreated, priorityFn];

export { filterFnList, compose };
