import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import { Link, useNavigate, useLocation } from "react-router-dom";
import EnterSchedule from "../modules/EnterSchedule.js";
import "./CreateSchedule.css";
import "./General.css";
import "./Mobile.css";
import {useMediaQuery} from 'react-responsive';

const CreateSchedule = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 500px)' });

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
      {console.log(JSON.stringify(taskList))}
      <div className="pageContainer">
        <div>
          <h1>Enter Your Availability</h1>
          <h3>Click and/or drag to select the times you're available for!</h3>
        </div>
        <div className="container">
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
        <button className="Button" onClick={handleClick}>
          Submit Availability
        </button>
      </div>
    </>
  );
};

export default CreateSchedule;
