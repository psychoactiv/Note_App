import React, { useEffect, useState } from "react";
import { DateHelperFn } from "../../utils/DateHelperFunction";
import { priorityItem } from "../../utils/priorityOptionHelper";
import { useNoteData } from "../../context/noteData-context";
import "./styles.css";

const DateAndPriority = ({
  item: { dateAndTime, priority, cardColor },
  payload,
}) => {
  const [dateState, updateDate] = useState("Loading...");
  const { dispatchNoteList } = useNoteData();

  useEffect(() => {
    setInterval(() => {
      DateHelperFn(updateDate, dateAndTime);
    }, 60000);
  });

  useEffect(() => {
    DateHelperFn(updateDate, dateAndTime);
  }, []);

  return (
    <div className="flex jc-sb datePriorityContainer flex-wrap">
      <div className="date-container common-style">{dateState}</div>
      <div className="flex child-container jc-sb">
        <div className="common-style">
          {`${dateAndTime.getDate()}/${dateAndTime.getMonth()}/${dateAndTime.getFullYear()}`}
        </div>
        <select
          className={`select-style ${cardColor}`}
          defaultValue={priority}
          onChange={(e) =>
            dispatchNoteList({
              type: "UPDATELABEL",
              payload: { ...payload, priority: e.target.value },
            })
          }
        >
          {priorityItem.map((item) => (
            <option value={item}>{item}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export { DateAndPriority };
