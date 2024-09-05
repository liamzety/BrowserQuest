import React, { useEffect, useState } from "react";
//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerHit from "../assets/images/king-hit.gif";
import playerDeath from "../assets/images/king-death.gif";
import playerDead from "../assets/images/king-dead.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyAtt from "../assets/images/wizard-att1.gif";
import enemyMove from "../assets/images/wizard-move.gif";
//BG
import bg from "../assets/images/bg/back0.jpg";
//Data
import charData from "../charData.json";
//Cmps
import { ActionsBar } from "./ActionsBar";
//Spells
import fireballStart from "../assets/images/firball.gif";
import calcService from "../services/calcService";
import { GameOverModal } from "./GameOverModal";
import { Character } from "./Character";
import { onBasicAttack } from "../skills/basicAttack";
import { onDoubleAttack } from "../skills/doubleAttack";
import { onSpellFireball } from "../skills/spellFireball";

export function Game() {
  //Characters and BG
  const [player, setPlayer] = useState({
    ...charData.player,
    gif: playerIdle,
    marginLeft: "",
    alignSelf: "center",
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
  });
  const [enemy, setEnemy] = useState({
    ...charData.wizard,
    gif: enemyIdle,
    marginRight: "",
    alignSelf: "center",
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
  });
  const bgStyle = {
    backgroundImage: `url(${bg})`,
  };
  //Turns managment
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  //Player spell
  const [spell, setSpell] = useState({
    type: fireballStart,
    left: "200px",
    opacity: "0",
  });

  const [isGameOver, setGameOver] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPlayerTurn]);

  //Keys managment
  function handleKeyDown(ev) {
    setIsPlayerTurn(false);
    if (!isPlayerTurn) return;

    switch (ev.key) {
      case "1":
        skillMiddleware(onBasicAttack, 0);
        break;
      case "2":
        skillMiddleware(onDoubleAttack, 1);
        break;
      case "3":
        skillMiddleware(onSpellFireball, 2);
        break;
      default:
        break;
    }
  }

  async function animateEnemy() {
    //Move to position
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyMove,
        marginRight: "calc(100% - 500px)",
        //find lowest hp and attack change: start / center / end
        //alignSelf: 'start'
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
    const dmgModel = calcService.calcAtt("enemy", 0);

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
        //on enemy return to initial: start / center / end
        // alignSelf: 'center'
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
      setIsPlayerTurn(true);
    } else {
      setGameOver(true);
    }
  }

  //Select enemy
  function onSelect() {
    setEnemy((prevState) => {
      return {
        ...prevState,
        isSelected: true,
      };
    });
  }

  function restartGame() {
    setPlayer({
      ...charData.player,
      gif: playerIdle,
      marginLeft: "",
      alignSelf: "center",
      dmgModel: {
        amount: null,
        isCrit: false,
        isShown: true,
      },
    });
    setEnemy({
      ...charData.wizard,
      gif: enemyIdle,
      marginRight: "",
      alignSelf: "center",
      dmgModel: {
        amount: null,
        isCrit: false,
        isShown: true,
      },
    });
    setIsPlayerTurn(true);
    setGameOver(false);
  }

  function skillMiddleware(cb, skillIdx) {
    // if skill mana cost is greater than current mana then return
    if (player.skills[skillIdx].manaCost > player.currMana) return;

    cb({
      player,
      setPlayer,
      enemy,
      setEnemy,
      enemyCb: animateEnemy,
      spell,
      setSpell,
    });
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
        onBasicAttack={() => skillMiddleware(onBasicAttack, 0)}
        onDoubleAttack={() => skillMiddleware(onDoubleAttack, 1)}
        onSpellFireball={() => skillMiddleware(onSpellFireball, 2)}
      />
      {isGameOver && <GameOverModal restartGame={restartGame} />}
    </section>
  );
}

export function _timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
