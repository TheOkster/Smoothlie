import React from "react";
import { Link } from "react-router-dom";
import UrgentImp from "../modules/UrgentImp.js";
const goToAddEvents = () => {};
const NewSmoothie = () => {
  return (
    <>
      <div>Create a new smoothie! Click the button below to begin.</div>
      <Link to={{ pathname: "/entertasks" }}>
        <button>Begin</button>
      </Link>
    </>
  );
};

export default NewSmoothie;
