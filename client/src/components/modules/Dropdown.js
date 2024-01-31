import React, { useState, useEffect } from "react";

// import "./.css";

/**
 * Component to render an online user
 * Proptypes
 *  *  sets it to active
 * @property {string} _id
 * @property {string} _name
 *  @param {string} label
 *  @param {Array[String]} fields
 *  *  @param handleChange
 */
const Dropdown = (props) => {
  return (
    <div className="Task-dropdown">
      {props.label && <label htmlFor={props._id}>{props.label}</label>}
      <select
        name={props._name}
        id={props._id}
        defaultValue={"default"}
        onChange={props.handleChange}
      >
        {props.fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
        <option value={"default"}> {props.defaultValue} </option>
      </select>
    </div>
  );
};

export default Dropdown;
