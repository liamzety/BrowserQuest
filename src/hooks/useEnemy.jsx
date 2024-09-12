import { useEffect, useRef, useState } from "react";
import { usePlayerStore } from "../store/store";
// ENEMY ANIMATIONS
import enemyIdle from "../assets/images/wizard-idle.gif";
import enemyHit from "../assets/images/wizard-hit.gif";
import enemyAtt from "../assets/images/wizard-att1.gif";
import enemyMove from "../assets/images/wizard-move.gif";
import { useCalcAtt } from "./useCalcAtt";
//PLAYER ANIMATIONS
import playerIdle from "../assets/images/king-idle.gif";
import playerHit from "../assets/images/king-hit.gif";
import playerDeath from "../assets/images/king-death.gif";
import playerDead from "../assets/images/king-dead.gif";
import { _timeout } from "../cmps/Game";

export const useEnemy = () => {
  const { enemy, player, setEnemy, setPlayer, isGameOver } = usePlayerStore();
  const [isCasting, setIsCasting] = useState(false);
  const [lastCollisionDirection, setLastCollisionDirection] = useState(null); // Track collision direction
  const [newCollisionDirection, setNewCollisionDirection] = useState(null); // Track collision direction
  const moveAmount = 5; // Adjust the movement speed as needed
  const castTimeoutRef = useRef(null); // Ref to store the casting timeout
  const { dmg, calcAtt } = useCalcAtt();
  let moveIntervalId = null;
  let castingIntervalId = null;

  // Function to start casting
  const startCasting = async () => {
    setIsCasting(true);
    setEnemy((prevState) => {
      return {
        ...prevState,
        gif: enemyAtt,
      };
    });
    //setting dmg to the player
    const dmgModel = calcAtt("enemy", 0);
    setPlayer((prevState) => {
      // player died
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

    // reset dmg model
    await _timeout(400);
    setPlayer((prevState) => {
      return {
        ...prevState,
        dmgModel: {
          amount: null,
          isCrit: false,
          isShown: false,
        },
      };
    });
    // player dead
    if (player.currHp - dmgModel.amount <= 0) {
      setPlayer((prevState) => {
        return {
          ...prevState,
          gif: playerDead,
          dmgModel: {
            amount: null,
            isCrit: false,
            isShown: false,
          },
        };
      });
    }

    castTimeoutRef.current = setTimeout(() => {
      setIsCasting(false);
    }, 600);
  };

  // Function to move the enemy
  const moveEnemy = () => {
    if (isCasting) return; // Skip movement if casting

    setEnemy((prevState) => {
      // Calculate distance to player
      const distanceX = player.x - prevState.x;
      const distanceY = player.y - prevState.y;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      let xChange = 0;
      let yChange = 0;
      let gif = enemyIdle; // Default gif
      let collisionDetected = false;

      if (distance <= 400) {
        // Calculate direction to move away from player
        const moveDirectionX = -distanceX / distance; // Inverse direction
        const moveDirectionY = -distanceY / distance; // Inverse direction

        xChange = moveDirectionX * moveAmount;
        yChange = moveDirectionY * moveAmount;

        // Calculate new position
        let newX = prevState.x + xChange;
        let newY = prevState.y + yChange;

        // Boundary conditions
        if (newX < 0) {
          newX = 0;
          collisionDetected = true;
          setNewCollisionDirection("left");
        } else if (newX > window.innerWidth - 250) {
          newX = window.innerWidth - 250;
          collisionDetected = true;
          setNewCollisionDirection("right");
        }

        if (newY < 0) {
          newY = 0;
          collisionDetected = true;
          setNewCollisionDirection("top");
        } else if (newY > window.innerHeight - 400) {
          newY = window.innerHeight - 400;
          collisionDetected = true;
          setNewCollisionDirection("bottom");
        }

        // Handle collision
        if (collisionDetected || lastCollisionDirection) {
          // Move in the opposite direction of the last collision
          switch (lastCollisionDirection) {
            case "left":
              newX = prevState.x + moveAmount;
              break;
            case "right":
              newX = prevState.x - moveAmount;
              break;
            case "top":
              newY = prevState.y + moveAmount;
              break;
            case "bottom":
              newY = prevState.y - moveAmount;
              break;
            default:
              break;
          }

          if (enemy.hitAnimationLockTimestamp < Date.now() - 400) {
            // Ensure the new position stays within bounds
            newX = Math.max(0, Math.min(newX, window.innerWidth - 250));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 400));
          } else {
            // dont move if animation lock (stagger)
            newX = prevState.x;
            newY = prevState.y;
          }

          // Update the last collision direction
          setLastCollisionDirection(newCollisionDirection);
        } else {
          // Reset the collision direction if no collision
          setLastCollisionDirection(null);
        }

        const gif =
          enemy.hitAnimationLockTimestamp < Date.now() - 400
            ? enemyMove
            : prevState.gif;
        return {
          ...prevState,
          gif,
          x: newX,
          y: newY,
          isMirrored: xChange > 0, // Mirror based on the direction of movement
          // isMirrored: isPlayerLeft, // Mirror opposite to the player's position
        };
      } else {
        // Player is out of range, stay idle
        // Determine if the player is to the left or right of the enemy
        const isPlayerLeft = player.x < prevState.x;
        return {
          ...prevState,
          gif,
          isMirrored: !isPlayerLeft, // Mirror to the player's position
        };
      }
    });
  };
  useEffect(() => {
    if (isGameOver) {
      clearInterval(moveIntervalId);
      return;
    }
    // Move enemy every 100ms
    moveIntervalId = setInterval(moveEnemy, 25);
    // Cleanup intervals on component unmount
    return () => {
      clearInterval(moveIntervalId);
      // if (castTimeoutRef.current) {
      //   clearTimeout(castTimeoutRef.current);
      // }
    };
  }, [
    isGameOver,
    isCasting,
    setEnemy,
    player.x,
    player.y,
    lastCollisionDirection,
  ]);

  useEffect(() => {
    if (isGameOver) {
      clearInterval(castingIntervalId);
      return;
    }
    castingIntervalId = setInterval(startCasting, 3000);

    return () => {
      clearInterval(castingIntervalId);
    };
  }, [isGameOver]);

  // useEffect(() => {
  //   setEnemy((prevState) => {
  //     return {
  //       ...prevState,
  //       gif: enemyHit,
  //     };
  //   });
  // }, [enemy.currHp]);
};
