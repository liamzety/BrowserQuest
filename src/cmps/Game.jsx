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
import { usePlayer } from "../hooks/usePlayer.jsx";
import { usePlayerStore } from "../store/store.js";
import { useCalcAtt } from "../hooks/useCalcAtt.jsx";
import basicAttack from "../skills/basicAttack.jsx";
import doubleAttack from "../skills/doubleAttack.jsx";
import spellFireball from "../skills/spellFireball.jsx";
import { useEnemy } from "../hooks/useEnemy.jsx";
import { charData } from "../charData.js";

export function Game() {
  const {
    player,
    setPlayer,
    enemy,
    setEnemy,
    setPlayerAttLock,
    setEnemyAttLock,
    isGameOver,
    setIsGameOver,
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
  // player management
  usePlayer(skillMiddleware);
  //enemy management
  useEnemy();
  // calc att
  const { dmg, calcAtt } = useCalcAtt();

  function restartGame() {
    setPlayer((prevData) => charData.player);
    setEnemy((prevData) => charData.enemy);
    setIsGameOver(false);
  }

  async function skillMiddleware(cb, skillIdx) {
    // if skill mana cost is greater than current mana then return
    // TODO: show txt low mana
    if (player.skills[skillIdx].manaCost > player.currMana) return;
    // attack is locked in animation
    if (player.isAttLocked) return;
    await cb({
      setIsGameOver,
      player,
      setPlayer,
      enemy,
      setEnemy,
      // enemyCb: animateEnemy,
      spell,
      setSpell,
      calcAtt,
      setPlayerAttLock,
    });
  }

  const [isVisible, setIsVisible] = useState(true);
  const userRef = useRef(null);
  const enemyRef = useRef(null);

  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the container
      rootMargin: "0px",
      threshold: 0, // Trigger when any part of the element is visible
    });

    if (userRef.current) {
      observer.observe(userRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (userRef.current) {
        observer.unobserve(userRef.current);
      }
    };
  }, []);

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
          <Character isUser charRef={userRef} charData={player} />
          <div>
            @@@@@@@@@@@@@@@
            {player.x}
          </div>
          <br />
          <div>@@@@ {isVisible ? "visible" : "not visible"}</div>
          {/* enemy */}
          <Character charRef={enemyRef} charData={enemy} />
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
