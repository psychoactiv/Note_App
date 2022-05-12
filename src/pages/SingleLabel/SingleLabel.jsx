import React from "react";
import { useLabel } from "../../context/label-context";
import { LabelList } from "../../components/LabelList/LabelList";

const SingleLabel = ({ label }) => {
  const {
    labelInitial: {
      labelPages: { allLabels },
    },
  } = useLabel();
  const labelArr = allLabels.filter((item) =>
    item.labelName.some((item) => item.toLowerCase() === label.toLowerCase())
  );
  return <LabelList labelDisplay={labelArr} />;
};

export { SingleLabel };
