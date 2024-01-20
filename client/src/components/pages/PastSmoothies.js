import React from "react";
import Dropdown from "../modules/Dropdown";
const PastSmoothies = () => {
  return (
    // For Now using the OS's built in dropdown, can change later
    // Obviously current parameters are just placeholders
    <Dropdown
      _id="feelings"
      _name="feelings"
      label="Enter your feelings: "
      fields={["I", "love", "this", "(jk)"]}
    />
  );
};

export default PastSmoothies;
