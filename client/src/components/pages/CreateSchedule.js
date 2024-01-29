import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EnterSchedule from "../modules/EnterSchedule.js";

const CreateSchedule = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [available, setAvailable] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [numDays, setNumDays] = useState(7);
  // const [hourlyChunks, setHourlyChunks] = useState(4); - need to add functionality in algorithm to do this
  const [minTime, setMinTime] = useState(9);
  const [maxTime, setMaxTime] = useState(17);
  const [taskList, setTaskList] = useState(location.state.taskList);

  const handleClick = (event) => {
    navigate("/result", {
      state: {
        available: available,
        taskList: taskList,
      },
    });
  };

  const handleChange = (setter) => {
    console.log("i am in the handleChange function");
    return (event) => {
      if (event.target.value !== "") {
        setter(event.target.value);
      }
    };
  };

  const handleScheduleChange = (newSchedule) => {
    console.log("in the handle schedule change function");
    console.log(newSchedule);
    setAvailable(newSchedule);
  };

  // to do: add functionality for user to enter startdate, numdays, mintime, maxtime
  return (
    <>
      <div className="pageContainer">
      <div>
        Start Date:
        <input type="date" defaultValue={new Date()} onChange={handleChange(setStartDate)} />
        Number of Days:
        <input
          type="number"
          min="1"
          max="1000"
          value={numDays}
          onChange={handleChange(setNumDays)}
        />
        Min Hour:
        <input
          type="number"
          min="0"
          max={maxTime - 1}
          value={minTime}
          onChange={handleChange(setMinTime)}
        />
        Max Hour:
        <input
          type="number"
          min={minTime + 1}
          max="24"
          value={maxTime}
          onChange={handleChange(setMaxTime)}
        />
      </div>
      <div>
        <ScheduleSelector
          minTime={minTime}
          maxTime={maxTime}
          numDays={numDays}
          startDate={startDate}
          selection={available}
          onChange={setAvailable}
          hourlyChunks={4}
          timeFormat="h:mma"
        />
      </div>
      {/* <EnterSchedule available={available} setAvailable={setAvailable} /> */}
      <button className="Button" onClick={handleClick}>Submit Availability</button>
      </div>
    </>
  );
};

export default CreateSchedule;
