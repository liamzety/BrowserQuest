import React, { useState } from "react";
import attack1 from "../assets/images/attack1.png";
import attack2 from "../assets/images/attack2.png";
import fireball from "../assets/images/fireball.jpg";
import heal from "../assets/images/heal.png";
import skull from "../assets/images/skull.png";
import skullFlip from "../assets/images/skull-flip.png";
import { Skill } from "./Skill";

export function ActionsBar({
  player,
  basicAttack,
  doubleAttack,
  spellFireball,
}) {
  const [skullStyle, setSkullStyle] = useState({
    top: "-7px",
    right: "-18px",
    transform: "rotate(35deg)",
  });
  function moveSkull() {
    setSkullStyle({
      top: "-38px",
      right: "-38px",
      transform: "rotate(405deg)",
    });
    setTimeout(() => {
      setSkullStyle({
        top: "-7px",
        right: "-18px",
        transform: "rotate(35deg)",
      });
    }, 1000);
  }
  return (
    <>
      <div className="actions-bar absolute">
        <div className="action-bar-container relative flex space-between align-center h-full">
          <div className="skills-container flex">
            <Skill
              disabled={player.skills[0].manaCost > player.currMana}
              numDisplay={1}
              cb={basicAttack}
              img={attack1}
            />
            <Skill
              disabled={player.skills[1].manaCost > player.currMana}
              numDisplay={2}
              cb={doubleAttack}
              img={attack2}
            />
            <Skill
              disabled={player.skills[2].manaCost > player.currMana}
              numDisplay={3}
              cb={spellFireball}
              img={fireball}
            />
            {/* <Skill cb={onHeal} img={heal} /> */}
          </div>
          <div className="settings-container flex space-between">
            <div className="setting">setting1</div>
            <div className="setting">setting2</div>
            <div className="setting">setting3</div>
          </div>
          <img className="deco-skull absolute w-full" src={skull} alt="" />
          <img
            onClick={moveSkull}
            style={{
              top: skullStyle.top,
              right: skullStyle.right,
              transform: skullStyle.transform,
            }}
            className="deco-skull absolute w-full"
            src={skullFlip}
            alt=""
          />
        </div>
        <div className="actionsbar-bg-img-wrapper absolute w-full h-full"></div>
        <div className="actionsbar-bg-img-wrapper absolute w-full h-full"></div>
      </div>
    </>
  );
}
