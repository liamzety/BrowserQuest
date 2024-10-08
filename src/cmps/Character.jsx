import React from "react";

export function Character({ isUser, charData, charRef }) {
  const characterPositionStyle = {
    left: charData.x + "px",
    top: charData.y + "px",
  };
  // if (isUser) {
  //   characterPositionStyle.left = charData.x + "px";
  //   characterPositionStyle.top = charData.y + "px";
  // }
  return (
    <div
      ref={charRef}
      className="character char-container"
      style={characterPositionStyle}
    >
      <img
        style={
          charData.isMirrored
            ? {
                transform: "scaleX(-1)",
              }
            : {
                transform: "scaleX(1)",
              }
        }
        className="character-sprite"
        src={charData.gif}
        alt=""
      />
      <div
        className="hp absolute"
        style={{
          height: "20px",
          width: "100px", // Fixed width of 100px
          backgroundColor: "black",
          left: "70px",
        }}
      >
        <div
          className="curr-hp absolute flex align-center"
          style={{
            height: "100%",
            width: `${(charData.currHp / charData.hp) * 100}%`, // Calculate width as a percentage
            backgroundColor: "red",
          }}
        ></div>
        <p
          className="flex align-center justify-center h-full"
          style={{
            zIndex: "1",
            position: "absolute",
            width: "100%",
            textAlign: "center",
            margin: 0,
          }}
        >
          {charData.currHp <= 0 ? 0 : charData.currHp}/{charData.hp}
        </p>
      </div>
      <div
        className="mana absolute"
        style={{
          height: "20px",
          width: "100px", // Fixed width of 100px
          backgroundColor: "black",
          left: "70px",
          bottom: "-40px",
        }}
      >
        <div
          className="curr-mana absolute flex align-center"
          style={{
            height: "100%",
            width: `${(charData.currMana / charData.mana) * 100}%`, // Calculate width as a percentage
            backgroundColor: "blue",
          }}
        ></div>
        <p
          className="flex align-center justify-center h-full"
          style={{
            zIndex: "1",
            position: "absolute",
            width: "100%",
            textAlign: "center",
            margin: 0,
          }}
        >
          {charData.currMana <= 0 ? 0 : charData.currMana}/{charData.mana}
        </p>
      </div>
      {charData.dmgModel.isShown && (
        <div
          className="dmg-output absolute"
          style={{
            color: charData.dmgModel.isCrit ? "red" : "green",
            fontSize: charData.dmgModel.isCrit ? "40px" : "25px",
            opacity: charData.currHp <= 0 ? 0 : 1,
            transition: ".5s",
          }}
        >
          {charData.dmgModel.amount}
        </div>
      )}
    </div>
  );
}
