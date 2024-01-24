import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";
import { Link, useNavigate } from "react-router-dom";

const CreateSchedule = (props) => {
  const navigate = useNavigate();

  const [available, setAvailable] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [numDays, setNumDays] = useState(7);
  // const [hourlyChunks, setHourlyChunks] = useState(4); - need to add functionality in algorithm to do this
  const [minTime, setMinTime] = useState(11);
  const [maxTime, setMaxTime] = useState(20);

  const handleClick = (event) => {
    // TO DO: store availability in database
    navigate("/selecttasks", {
      state: { available },
    });
  };

  // to do: add functionality for user to enter startdate, numdays, mintime, maxtime
  return (
    <div className="TaskPage-pageContainer">
      <div>
        <ScheduleSelector
          minTime={minTime}
          maxTime={maxTime}
          numDays={numDays}
          startDate={new Date(startDate)}
          selection={available}
          onChange={setAvailable}
          hourlyChunks={2}
          timeFormat="h:mma"
        />
      </div>
      <button className="Button" onClick={handleClick}>Submit Availability</button>
    </div>
  );
};

export default CreateSchedule;
