import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

// sources for react-big-calendar code: https://www.npmjs.com/package/react-big-calendar,
// https://github.com/jquense/react-big-calendar/issues/234, https://github.com/jquense/react-big-calendar,
// https://github.com/jquense/react-big-calendar/issues/278, https://stackoverflow.com/questions/55737134/how-to-get-selected-event-in-react-big-calendar

const localizer = momentLocalizer(moment);

const Smoothie = (props) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleSelectEvent = (event) => {
    console.log(event);
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div style={{ height: "500pt" }}>
      <Calendar
        events={props.events}
        startAccessor="start"
        endAccessor="end"
        defaultDate={moment().toDate()}
        localizer={localizer}
        defaultView="week"
        selectable={true}
        onSelectEvent={handleSelectEvent}
      />

      {/* consulted chatgpt and https://www.npmjs.com/package/react-modal for some of the code about Modals */}
      <Modal
        isOpen={selectedEvent !== null}
        onRequestClose={closeModal}
        contentLabel="Event Details"
        style={{
          content: {
            width: "50%", // Adjust the width as needed
            height: "50%", // Adjust the height as needed
            margin: "auto", // Center the modal horizontally
          },
        }}
      >
        {selectedEvent ? (
          <div>
            <h2> {selectedEvent.title} </h2>
            <ul>
              <li>
                {selectedEvent.urgent ? null : "Not"} Urgent and{" "}
                {selectedEvent.important ? null : "Not"} Important
              </li>
              <li>
                <b>Additional Information: </b> {selectedEvent.description}
              </li>
            </ul>
            <button onClick={closeModal}> Close </button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
};

export default Smoothie;
