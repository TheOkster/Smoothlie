import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Modal from "react-modal";

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
        {selectedEvent && (
          <div>
            <h2> {selectedEvent.title} </h2>
            <p>Information about the event goes here</p>
            <button onClick={closeModal}> Close </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Smoothie;
