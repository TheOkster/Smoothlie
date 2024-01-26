import React, { useState, useEffect } from "react";
import Smoothie from "../modules/Smoothie.js";
import { get, post } from "../../utilities";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./General.css";

import EnterSchedule from "../modules/EnterSchedule.js";

const Result = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  const location = useLocation();

  const [available, setAvailable] = useState(location.state.available);
  const [taskList, setTaskList] = useState(location.state.taskList);
  const [smoothie, setSmoothie] = useState([]);

  // why is this continuously called?
  useEffect(() => {
    post("/api/scheduler", {
      schedule: available,
      taskList: taskList,
    }).then((smoothie) => setSmoothie([smoothie[0], smoothie[1].map(formatSmoothie)]));
  }, []);

  const formatSmoothie = (event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
    };
  };

  // const body = { owner: props.userId, events: smoothie };
  // TODO: allow option  for user to enter the name of the smoothie
  // post("/api/smoothie", body);
  const events = [
    {
      title: "My Event",
      start: new Date("2024-01-27T18:15:00.000Z"),
      end: new Date("2024-01-27T19:45:00.000Z"),
    },
  ];

  return (
    <>
      {console.log(smoothie)}
      {smoothie[0] ? "Tasks scheduled successfully!" : "Failed to schedule all tasks."}
      <Smoothie events={smoothie[1]} />
    </>
  );
};

export default Result;
