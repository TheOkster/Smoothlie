import React, { useState, useEffect } from "react";
import "./Task.css";
import "../../utilities.css";
import "../pages/General.css";
/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @property {string} name
 * @param onDelete
 * @param {function} onTitleClick

 */
const Task = (props) => {
  const modifiedOnTitleClick = () => {
    return props.onTitleClick(props._id);
  };
  return (
    <p className="ViewTasks-taskTitle Label" onClick={modifiedOnTitleClick}>
      {props.name}
    </p>
  );
};

export default Task;
