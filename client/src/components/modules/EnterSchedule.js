import React, { useState } from "react";
import ScheduleSelector from "react-schedule-selector";

const EnterSchedule = (props) => {
  const [availability, setAvailability] = useState([]);

  const handleChange = (newSchedule) => {
    setAvailability(newSchedule);
  };

  return (
    <ScheduleSelector
      selection={availability}
      numDays={5}
      minTime={8}
      maxTime={23}
      hourlyChunks={4}
      onChange={handleChange}
    />
  );
};

export default EnterSchedule;
