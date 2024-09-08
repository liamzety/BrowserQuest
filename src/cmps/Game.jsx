import React, { useEffect, useRef, useState } from "react";
//Assets
import fireballStart from "../assets/images/firball.gif";
//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerHit from "../assets/images/king-hit.gif";
import playerDeath from "../assets/images/king-death.gif";
import playerDead from "../assets/images/king-dead.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyAtt from "../assets/images/wizard-att1.gif";
import enemyMove from "../assets/images/wizard-move.gif";
//BG
import bg from "../assets/images/bg/back0.jpg";
//Cmps
import { ActionsBar } from "./ActionsBar";
import { Character } from "./Character";

//Spells
import { GameOverModal } from "./GameOverModal";
// Hooks
import { useKeyPressHook } from "../hooks/useKeyPressHook.jsx";
import { usePlayerStore } from "../store/store.js";
import { useCalcAtt } from "../hooks/useCalcAtt.jsx";
import basicAttack from "../skills/basicAttack.jsx";
import doubleAttack from "../skills/doubleAttack.jsx";
import spellFireball from "../skills/spellFireball.jsx";

export function Game() {
  const {
    player,
    setPlayer,
    enemy,
    setEnemy,
    setPlayerAttLock,
    setEnemyAttLock,
  } = usePlayerStore();
  // BG
  const bgStyle = {
    backgroundImage: `url(${bg})`,
  };
  //Player spell
  const [spell, setSpell] = useState({
    type: fireballStart,
    left: "200px",
    opacity: "0",
  });
  const [isGameOver, setGameOver] = useState(false);
  // key managment
  useKeyPressHook(skillMiddleware);
  // calc att
  const { dmg, calcAtt } = useCalcAtt();

  async function animateEnemy() {
    //Move to position
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyMove,
        marginRight: "calc(100% - 500px)",
        //find lowest hp and attack change: start / center / end
      };
    });
    //Attack animation
    await _timeout(400);
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyAtt,
      };
    });
    //Player hit
    await _timeout(300);
    //setting dmg to the player
    const dmgModel = calcAtt("enemy", 0);

    setPlayer((prevState) => {
      if (prevState.currHp - dmgModel.amount <= 0) {
        return {
          ...prevState,
          currHp: 0,
          dmgModel,
          gif: playerDeath,
        };
      }
      return {
        ...prevState,
        currHp: (prevState.currHp - dmgModel.amount).toFixed(),
        dmgModel,
        gif: playerHit,
      };
    });

    if (player.currHp - dmgModel.amount <= 0) {
      setPlayer((prevState) => {
        return {
          ...prevState,
          gif: playerDead,
        };
      });
    }

    //Move back
    await _timeout(300);
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyIdle,
        marginRight: "0",
      };
    });
    //Player change to idle and reset dmg
    if (player.currHp - dmgModel.amount > 0) {
      setPlayer((prevState) => {
        return {
          ...prevState,
          gif: playerIdle,
          dmgModel: {
            amount: null,
            isCrit: false,
            isShown: false,
          },
        };
      });
      //Player's turn
      await _timeout(400);
    } else {
      setGameOver(true);
    }
  }
  function restartGame() {
    setPlayer((prevState) => {
      return {
        ...prevState,
        gif: playerIdle,
        marginLeft: "",
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: true,
        },
      };
    });
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyIdle,
        marginRight: "",
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: true,
        },
      };
    });
    setGameOver(false);
  }

  async function skillMiddleware(cb, skillIdx) {
    // if skill mana cost is greater than current mana then return
    // TODO: show txt low mana
    if (player.skills[skillIdx].manaCost > player.currMana) return;
    // attack is locked in animation
    if (player.isAttLocked) return;
    await cb({
      player,
      setPlayer,
      enemy,
      setEnemy,
      enemyCb: animateEnemy,
      spell,
      setSpell,
      calcAtt,
      setPlayerAttLock,
    });
  }
  if (!player || !enemy) {
    return <div>loading</div>;
  }
  return (
    <section
      style={{ backgroundImage: bgStyle.backgroundImage }}
      className="game"
    >
      <div className="zone-container flex align-center">
        <div className="chars-container flex space-between relative w-full">
          {/* player */}
          <Character isUser charData={player} />
          <div>
            @@@@@@@@@@@@@@@
            {player.x}
          </div>
          {/* enemy */}
          <Character charData={enemy} />
          <img
            className="spell absolute"
            src={spell.type}
            style={{ opacity: spell.opacity, left: spell.left }}
            alt=""
          />
        </div>
      </div>

      <ActionsBar
        player={player}
        basicAttack={() => skillMiddleware(basicAttack, 0)}
        doubleAttack={() => skillMiddleware(doubleAttack, 1)}
        spellFireball={() => skillMiddleware(spellFireball, 2)}
      />
      {isGameOver && <GameOverModal restartGame={restartGame} />}
    </section>
  );
}

export function _timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
