import React from "react";

const Checkbox = (...props, children) => (
  <Checkbox
    id={props.id}
    checked={Boolean(item.is_correct)}
    onChange={e => {
      formik.handleChange(
        `question.answer[${index}].is_correct`
      )(e);
      handleUpdateContext(
        updateAnswer,
        e.target.checked,
        "is_correct",
        formik.values.index,
        index
      );
    }}
    inputProps={{ "aria-label": "primary checkbox" }}
  />
);

export default Checkbox;
