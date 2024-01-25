import React, { useState } from "react";
import Smoothie from "../modules/Smoothie.js";
import { get, post } from "../../utilities";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Result = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const location = useLocation();

  const [available, setAvailable] = useState(location.state.available);
  const [taskList, setTaskList] = useState(location.state.taskList);
  const [smoothie, setSmoothie] = useState([]);

  console.log(`type of available before entering api call ${Array.isArray(available)}`);
  console.log(`what is tasklist: ${taskList}`);
  const newSmoothie = post("/api/scheduler", {
    schedule: available,
    taskList: taskList,
  }).then((event) => setSmoothie(smoothie));
  const body = { owner: props.userId, events: newSmoothie };
  // TODO: allow option  for user to enter the name of the smoothie
  post("/api/smoothie", body);
  const events = [
    {
      title: "My Event",
      start: new Date("2024-04-12T13:45:00-05:00"),
      end: new Date("2024-04-12T14:00:00-05:00"),
    },
  ];

  return (
    <>
      {smoothie[0] ? "be gay and do crime" : "Failed to schedule all tasks"}

      <Smoothie events={smoothie[1]} />
    </>
  );
};

export default Result;
