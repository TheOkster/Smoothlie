import React from "react";

const Result = (props) => {
  const newSchedule = get("api/scheduler", { schedule: props.schedule, tasks: props.tasks });
};
