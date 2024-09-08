import React, { useState, useEffect, useRef } from "react";

const MovableDiv = () => {
  const [position, setPosition] = useState({ top: 50, left: 50 });
  const moveAmount = 5; // Amount to move per key press
  const pressedKeys = useRef(new Set());

  useEffect(() => {
    const handleKeyDown = (event) => {
      pressedKeys.current.add(event.key);
    };

    const handleKeyUp = (event) => {
      pressedKeys.current.delete(event.key);
    };

    const updatePosition = () => {
      const { top, left } = position;
      const newPosition = { top, left };

      if (pressedKeys.current.has("w")) newPosition.top -= moveAmount;
      if (pressedKeys.current.has("a")) newPosition.left -= moveAmount;
      if (pressedKeys.current.has("s")) newPosition.top += moveAmount;
      if (pressedKeys.current.has("d")) newPosition.left += moveAmount;

      setPosition(newPosition);
    };

    // Set up event listeners
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Set up an interval to update position while keys are pressed
    const intervalId = setInterval(updatePosition, 30); // Update every 30 ms

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      clearInterval(intervalId);
    };
  }, [position]);

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        position: "absolute",
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
    />
  );
};

export default MovableDiv;
