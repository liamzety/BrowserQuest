import { _timeout } from "../cmps/Game";
//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerAtt from "../assets/images/king-att1.gif";
//ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyDeath from "../assets/images/wizard-death.gif";
import enemyDead from "../assets/images/wizard-dead.gif";
import { X_MELEE_RANGE, Y_MELEE_RANGE } from "../constants/ranges";

async function basicAttack({
  setIsGameOver,
  setPlayer,
  player,
  setEnemy,
  enemy,
  calcAtt,
  setPlayerAttLock,
}) {
  setPlayerAttLock(true);

  //Player attack animation
  await _timeout(400);
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerAtt,
    };
  });
  if (
    !(
      player.x >= enemy.x - X_MELEE_RANGE &&
      player.x <= enemy.x + X_MELEE_RANGE &&
      player.y >= enemy.y - Y_MELEE_RANGE &&
      player.y <= enemy.y + Y_MELEE_RANGE
    )
  ) {
    await _timeout(200);
    setPlayerAttLock(false);
    return;
  }

  // Check if the player is facing the right direction relative to the enemy
  const playerIsFacingEnemy =
    (player.isMirrored && player.x > enemy.x) ||
    (!player.isMirrored && player.x < enemy.x);

  if (!playerIsFacingEnemy) {
    // If player is not facing the enemy, abort the attack
    console.log("Player is not facing the enemy.");
    setPlayerAttLock(false);
    return;
  }

  //Enemy hit
  await _timeout(300);
  //setting dmg to the enemy
  const dmgModel = calcAtt("player", 0);
  setEnemy((prevState) => {
    if (prevState.currHp - dmgModel.amount <= 0) {
      // Enemy dead
      return {
        ...prevState,
        currHp: 0,
        dmgModel,
        gif: enemyDeath,
      };
    }
    return {
      ...prevState,
      currHp: prevState.currHp - dmgModel.amount,
      dmgModel,
      gif: enemyHit,
      hitAnimationLockTimestamp: Date.now(),
    };
  });

  //Player idle animation
  setPlayer((prevState) => {
    return {
      ...prevState,
      gif: playerIdle,
    };
  });
  setPlayerAttLock(false);

  //Enemy change to idle and reset dmg
  await _timeout(400);
  if (enemy.currHp - dmgModel.amount > 0) {
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyIdle,
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: false,
        },
      };
    });
  } else {
    // Enemy dead?
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyDead,
      };
    });

    setIsGameOver(true);
  }
}

export default basicAttack;
