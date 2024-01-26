import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const Smoothie = (props) => {
  return (
    <div style={{ height: "500pt" }}>
      <Calendar
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        defaultView="week"
      />
    </div>
  );
};

export default Smoothie;
