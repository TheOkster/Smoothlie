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
const TaskCheckbox = (props) => {
  return (
    <div className="Checkbox-checkbox">
      <input id={props.for} type="checkbox" onChange={props.handleChange} />
      <Task
        key={props.task._id}
        _id={props.task._id}
        name={props.task.name}
        onDelete={props.handleDelete}
        onTitleClick={props.onTitleClick}
      />
    </div>
  );
};

export default TaskCheckbox;
