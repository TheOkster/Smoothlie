import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

// Setup the localizer by providing the moment (or globalize, or Luxon) Object
// to the correct localizer.
const localizer = momentLocalizer(moment); // or globalizeLocalizer

const Smoothie = (props) => (
  <div className="myCustomHeight">
    <Calendar localizer={localizer} events={props.events} startAccessor="start" endAccessor="end" />
  </div>
);

export default Smoothie;