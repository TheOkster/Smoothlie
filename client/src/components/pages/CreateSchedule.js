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
  const [minTime, setMinTime] = useState(11);
  const [maxTime, setMaxTime] = useState(20);
  const [taskList, setTaskList] = useState(location.state.taskList);

  console.log(`task list in createschedule ${JSON.stringify(taskList)}`);

  const handleClick = (event) => {
    navigate("/result", {
      state: {
        available: available,
        taskList: taskList,
      },
    });
  };

  const handleChange = (newSchedule) => {
    setAvailable(newSchedule);
  };

  // to do: add functionality for user to enter startdate, numdays, mintime, maxtime
  return (
    <>
      {/* //   <div>
    //     <ScheduleSelector
    //       minTime={minTime}
    //       maxTime={maxTime}
    //       numDays={numDays}
    //       startDate={new Date(startDate)}
    //       selection={available}
    //       onChange={handleChange}
    //       hourlyChunks={2}
    //       timeFormat="h:mma"
    //     />
    //   </div> */}
      <EnterSchedule available={available} setAvailable={setAvailable} />
      <button onClick={handleClick}>Submit Availability</button>
    </>
  );
};

export default CreateSchedule;
