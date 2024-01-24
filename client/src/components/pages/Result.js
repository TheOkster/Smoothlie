import React from "react";
import Smoothie from "../modules/Smoothie.js";
import { get, post } from "../../utilities";

const Result = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }

  const newSmoothie = get("api/scheduler", { schedule: props.schedule, tasks: props.tasks });
  const body = { owner: props.userId, events: newSmoothie }; // TODO: allow option  for user to enter the name of the smoothie
  post("/api/smoothie", body);
  //   const events = [
  //     {
  //       title: "My Event",
  //       start: new Date("2024-04-12T13:45:00-05:00"),
  //       end: new Date("2024-04-12T14:00:00-05:00"),
  //     },
  //   ];

  return (
    <>
      this is the results page
      <Smoothie events={newSmoothie} />
    </>
  );
};

export default Result;
