import React from "react";

const states = [
  "Andhra Pradesh",
  "Telangana",
  "Tamil Nadu",
  "Karnataka",
  "Kerala",
  "Maharashtra",
  "Uttar Pradesh",
  "Bihar",
  "Rajasthan",
  "West Bengal",
  "Madhya Pradesh",
  "Gujarat"
];

export default function StateDropdown({ onSelect }) {
  return (
    <select onChange={(e) => onSelect(e.target.value)}>
      <option value="">Select State</option>
      {states.map((state, i) => (
        <option key={i} value={state}>
          {state}
        </option>
      ))}
    </select>
  );
}
