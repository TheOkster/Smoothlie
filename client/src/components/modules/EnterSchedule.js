import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const EnterSchedule = (props) => {
  const [schedule, setSchedule] = useState([]);

  const handleChange = (newSchedule) => {
    setSchedule(newSchedule);
  };

  // if (schedule.length > 1) {
  //   console.log(schedule[0].getTime());
  // }

  return (
    <ScheduleSelector
      selection={schedule}
      numDays={5}
      minTime={8}
      maxTime={23}
      hourlyChunks={4}
      onChange={handleChange}
    />
  );
};

export default EnterSchedule;
