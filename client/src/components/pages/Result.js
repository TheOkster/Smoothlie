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

  const [smoothie, setSmoothie] = useState([]);
  const [smoothieName, setSmoothieName] = useState("");

  // why is this continuously called?
  useEffect(() => {
    if (location.state) {
      post("/api/scheduler", {
        schedule: location.state.available,
        taskList: location.state.taskList,
      }).then((smoothie) => {
        setSmoothie([smoothie[0], smoothie[1].map(formatSmoothie)]);
      });
    }
  }, [location]);

  const formatSmoothie = (event) => {
    return {
      title: event.title,
      start: new Date(event.start),
      end: new Date(event.end),
      description: event.description,
      label: event.label,
      urgent: event.urgent,
      important: event.important,
      fruit: event.fruit,
    };
  };

  // const body = { owner: props.userId, events: smoothie };
  // TODO: allow option  for user to enter the name of the smoothie
  // post("/api/smoothie", body);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (smoothieName === "") {
      alert("Please enter a name for your smoothie to save it!");
      return false;
    }
    const body = {
      owner: props.userId,
      events: smoothie[1],
      dateCreated: new Date(),
      name: smoothieName,
    };
    post("/api/smoothie", body).then(alert("Smoothie saved successfully!"));
    setSmoothieName("");
  };

  const handleChange = (event) => {
    setSmoothieName(event.target.value);
  };

  return (
    <>
      <div>
        {smoothie[0] ? "Tasks scheduled successfully!" : "Failed to schedule all tasks."}
        {console.log(smoothie[1])}
        <Smoothie events={smoothie[1]} />
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          Enter a name for your smoothie:
          <input type="text" value={smoothieName} id="text" onChange={handleChange} />
          <input type="submit" value="Save Smoothie" />
        </form>
        {/* <p>Smoothie Name:</p>
        <button onClick={handleClick}>Save Smoothie</button> */}
      </div>
    </>
  );
};

export default Result;
