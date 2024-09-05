import React, { useState } from "react";

export function Skill({ disabled, cb, img, numDisplay }) {
  return (
    <button
      disabled={disabled}
      onClick={cb}
      className="skill-portrait-container flex justify-center align-center relative"
    >
      <img className="skill-portrait" src={img} alt="" />
      <div className="keybind flex justify-center align-center absolute">
        {numDisplay}
      </div>
    </button>
  );
}
