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
    return (event) => {
      if (event.target.value !== "") {
        setter(event.target.value);
      }
    };
  };

  const handleScheduleChange = (newSchedule) => {
    setAvailable(newSchedule);
  };

  // to do: add functionality for user to enter startdate, numdays, mintime, maxtime
  return (
    <>
      <div>
        Start Date:
        <input type="date" defaultValue={new Date()} onChange={handleChange(setStartDate)} />
        Number of Days:
        <input
          type="number"
          min="1"
          max="1000"
          value={numDays}
          onChange={(event) => setNumDays(Number(event.target.value))}
        />
        Min Hour:
        <input
          type="number"
          min="0"
          max={maxTime - 1}
          value={minTime}
          onChange={(event) => setMinTime(Number(event.target.value))}
        />
        Max Hour:
        <input
          type="number"
          min={minTime + 1}
          max="24"
          value={maxTime}
          onChange={(event) => setMaxTime(Number(event.target.value))}
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
      <button onClick={handleClick}>Submit Availability</button>
    </>
  );
};

export default CreateSchedule;
