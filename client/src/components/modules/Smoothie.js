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
            <ul>
              <li>
                {console.log(JSON.stringify(selectedEvent))}
                {selectedEvent.urgent ? null : "Not"} Urgent and{" "}
                {selectedEvent.important ? null : "Not"} Important
              </li>
              <li>
                {" "}
                <b> Label: </b> {selectedEvent.label}{" "}
              </li>
              <li>
                <b>Additional Information: </b> {selectedEvent.description}
              </li>
            </ul>
            <button className="Button" onClick={closeModal}> Close </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Smoothie;
