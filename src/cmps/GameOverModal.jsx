import React, { useState } from "react";
import cursor from "../assets/images/cursor.png";

export function GameOverModal({ restartGame }) {
  const [gauntlet, setGauntlet] = useState({
    g1: false,
    g2: false,
    g3: false,
  });
  return (
    <>
      <div className="game-over-modal fixed">
        <div className="game-over-modal-container space-between flex align-center col h-full ">
          <h1>GAME OVER</h1>
          <div className="game-actions-container flex col w-full">
            <div className="btn-container">
              <img
                className="cursor"
                style={{ opacity: gauntlet.g1 ? "1" : "0" }}
                src={cursor}
                alt=""
              />
              <button
                onMouseEnter={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g1: true };
                  });
                }}
                onMouseLeave={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g1: false };
                  });
                }}
                onClick={restartGame}
              >
                <span>R</span>estart
              </button>
            </div>
            <div className="btn-container">
              <img
                className="cursor"
                style={{ opacity: gauntlet.g2 ? "1" : "0" }}
                src={cursor}
                alt=""
              />
              <button
                onMouseEnter={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g2: true };
                  });
                }}
                onMouseLeave={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g2: false };
                  });
                }}
              >
                <span>C</span>haracter Select
              </button>
            </div>
            <div className="btn-container">
              <img
                className="cursor"
                style={{ opacity: gauntlet.g3 ? "1" : "0" }}
                src={cursor}
                alt=""
              />
              <button
                onMouseEnter={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g3: true };
                  });
                }}
                onMouseLeave={() => {
                  setGauntlet((prevState) => {
                    return { ...prevState, g3: false };
                  });
                }}
              >
                <span>A</span>bout
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-screen-wrapper"></div>
    </>
  );
}
