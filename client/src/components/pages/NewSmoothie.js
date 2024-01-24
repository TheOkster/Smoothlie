import React from "react";

import UrgentImp from "../modules/UrgentImp.js";

import EnterSchedule from "../modules/EnterSchedule.js";

const NewSmoothie = () => {
  return (
    <>
      <div>Create a new smoothie! Click the button below to begin.</div>
      <EnterSchedule />
      {/* <UrgentImp /> */}
    </>
  );
};

export default NewSmoothie;
