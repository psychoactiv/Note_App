import React from "react";
import { LabelList } from "../../components/LabelList/LabelList";
import { useLabel } from "../../context/label-context";

const Label = () => {
  const {
    labelInitial: {
      labelPages: { allLabels },
    },
  } = useLabel();
  return <LabelList labelDisplay={allLabels} />;
};

export { Label };
