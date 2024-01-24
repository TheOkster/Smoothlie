import React from "react";
import { Link } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
// import EnterSchedule from "../modules/EnterSchedule.js";

const NewSmoothie = (props) => {
  if (!props.userId) {
    return <div>Please login before you use Smoothlie!</div>;
  }
  return (
    <>
      <div>Create a new smoothie! Click the button below to begin.</div>
      <UrgentImp />
    </>
  );
};

export default NewSmoothie;
