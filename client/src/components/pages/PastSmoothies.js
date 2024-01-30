import React, { useState, useEffect } from "react";
import Dropdown from "../modules/Dropdown";
import { get, post } from "../../utilities";
import Smoothie from "../modules/Smoothie";
import { eventNames } from "../../../../server/models/smoothie";

const PastSmoothies = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }

  const [smoothies, setSmoothies] = useState([]);
  const [smoothieNames, setSmoothieNames] = useState([]);
  const [displaySmoothie, setDisplaySmoothie] = useState(null);

  useEffect(() => {
    get("/api/smoothiesbyuser", { owner: props.userId }).then((output) => {
      setSmoothies(output.smoothies);
      const names = output.smoothies.map((obj) => {
        return obj.name;
      });
      setSmoothieNames(names);
    });
  }, []);

  const handleChange = (event) => {
    const smoothieName = event.target.value;

    // if user selects default option, do not display a smoothie
    if (smoothieName === "default") {
      setDisplaySmoothie(null);
    }

    // find the smoothie the user wants to display and set it as the display smoothie
    for (let i = 0; i < smoothies.length; i++) {
      if (smoothies[i].name === smoothieName) {
        setDisplaySmoothie(smoothies[i]);
      }
    }

    // query database for the smoothie name using api call
    // then displaly this smoothie
    // NOTE: issue when we have two smoothies with the same name --- should we prevent users from creating smoothies with same name?
    // get("/api/smoothiesbyname", { owner: props.userID, name: smoothieName }).then((output) => {
    //   setDisplaySmoothie(output.smoothies);
    // });
  };

  if (smoothieNames.length === 0) {
    return (
      <>You do not have any past smoothies to display. Click "New Smoothies" to get started!</>
    );
  }

  return (
    // For Now using the OS's built in dropdown, can change later
    // Obviously current parameters are just placeholders
    <>
      <Dropdown
        _id="pastsmoothies"
        _name="pastsmoothies"
        label="Pick a smoothie to render: "
        handleChange={handleChange}
        fields={smoothieNames}
        defaultValue={"Select Smoothie"}
      />
      {displaySmoothie ? (
        <Smoothie
          events={displaySmoothie.events.map((event) => {
            return {
              title: event.title,
              start: new Date(event.start),
              end: new Date(event.end),
              description: event.description,
              label: event.label,
              urgent: event.urgent,
              important: event.important,
              fruit: event.fruit,
            };
          })}
        />
      ) : null}
    </>
  );
};

export default PastSmoothies;
