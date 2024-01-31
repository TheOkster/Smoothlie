import React, { useState, useEffect } from "react";
import "../pages/General.css";
import Task from "./Task";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} text
 * @property {function} handleChange
 *  * @param for
 * * @param onTitleClick
 **/
const Checkbox = (props) => {
  return (
    <div className="Checkbox-checkbox">
      <input id={props.for} type="checkbox" onChange={props.handleChange} />
      {props.text}
    </div>
  );
};

export default Checkbox;
