import React, { useState, useEffect } from "react";
import Dropdown from "../modules/Dropdown";
import { get, post } from "../../utilities";

const PastSmoothies = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }

  const [smoothies, setSmoothies] = useState([]);
  const [smoothieNames, setSmoothieNames] = useState([]);

  console.log(typeof props.userId);

  useEffect(() => {
    get("/api/smoothies", { owner: props.userId }).then((output) => {
      // let smoothies = output.smoothies.filter((smoothie) => {
      //   smoothie.name !== null;
      // });
      setSmoothies(output.smoothies);
      const names = output.smoothies.map((obj) => {
        return obj.name;
      });
      console.log(`smoothies ${JSON.stringify(output.smoothies[0].name)}`);
      console.log(`names ${names}`);
      setSmoothieNames(names);
    });
  }, []);

  // useEffect(
  //   get("/api/smoothies", { owner: props.userId }).then((smoothies) => {
  //     setSmoothies(smoothies);
  //   }),
  //   []
  // );

  // fields={smoothies.map((smoothie) => {
  //   smoothie.name;
  // })}

  return (
    // For Now using the OS's built in dropdown, can change later
    // Obviously current parameters are just placeholders
    <>
      <Dropdown
        _id="pastsmoothies"
        _name="pastsmoothies"
        label="Pick a smoothie to render: "
        handleChange={() => {}}
        fields={smoothieNames}
      />
    </>
  );
};

export default PastSmoothies;
