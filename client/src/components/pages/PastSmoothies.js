import React, { useState, useEffect } from "react";
import Dropdown from "../modules/Dropdown";
import { get, post } from "../../utilities";
import Smoothie from "../modules/Smoothie";

const PastSmoothies = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }

  const [smoothies, setSmoothies] = useState([]);
  const [smoothieNames, setSmoothieNames] = useState([]);
  const [displaySmoothie, setDisplaySmoothie] = useState(null);

  useEffect(() => {
    get("/api/smoothiesbyuser", { owner: props.userId }).then((output) => {
      console.log(JSON.stringify(output.smoothies[0].events));
      setSmoothies(output.smoothies);
      const names = output.smoothies.map((obj) => {
        return obj.name;
      });
      setSmoothieNames(names);
    });
  }, []);

  const handleChange = (event) => {
    const smoothieName = event.target.value;
    if (smoothieName === "default") {
      setDisplaySmoothie(null);
    }

    for (let i = 0; i < smoothies.length; i++) {
      if (smoothies[i].name === smoothieName) {
        console.log(JSON.stringify(smoothies[i].events));
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
      {displaySmoothie ? <Smoothie events={displaySmoothie.events} /> : null}
    </>
  );
};

export default PastSmoothies;
