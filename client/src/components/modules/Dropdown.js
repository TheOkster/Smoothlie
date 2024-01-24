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
    // Uses Builtin OS dropdown, can change later for better design
    // Will Have to redo since there's currently no way to retrieve the selected field
    <div className="Dropdown-dropdown">
      {props.label && <label for={props._id}>{props.label}</label>}
      <select name={props._name} id={props._id} onChange={props.handleChange}>
        {props.fields.map((field) => (
          <option key={field} value={field}>
            {field}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
