import playerMove from "../assets/images/king-move.gif";
import playerIdle from "../assets/images/king-idle.gif";
import { useEffect, useRef } from "react";
import { usePlayerStore } from "../store/store";
import basicAttack from "../skills/basicAttack";
import doubleAttack from "../skills/doubleAttack";
import spellFireball from "../skills/spellFireball";
import playerAtt from "../assets/images/king-att1.gif";

export const useKeyPressHook = (skillMiddleware) => {
  const { player, setPlayer } = usePlayerStore();
  const pressedKeysRef = useRef(new Set());

  useEffect(() => {
    const handleKeyUp = (ev) => {
      // smooth movement logic, when key up we remove the key from hold down
      if (["a", "d", "w", "s"].includes(ev.key)) {
        pressedKeysRef.current.delete(ev.key);
      }
    };

    const handleKeyDown = (ev) => {
      // smooth movement logic, when key down we add the key to hold down
      pressedKeysRef.current.add(ev.key);

      if (!player.isAttLocked) {
        switch (ev.key) {
          case "c":
            skillMiddleware(basicAttack, 0);
            break;
          case "2":
            skillMiddleware(doubleAttack, 1);
            break;
          case "3":
            skillMiddleware(spellFireball, 2);
            break;

          default:
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [player, skillMiddleware]);

  // this useEffect is initiating the interval, the interval will check very fast
  // for any movement (by checking the array of pressed keys)
  useEffect(() => {
    const moveAmount = 10; // Adjust the movement speed as needed

    const movePlayer = async () => {
      let xChange = 0;
      let yChange = 0;
      if (pressedKeysRef.current.has("a")) {
        setPlayer((prevState) => {
          return {
            ...prevState,
            isMirrored: true,
          };
        });
        xChange -= moveAmount;
      }
      if (pressedKeysRef.current.has("d")) {
        setPlayer((prevState) => {
          return {
            ...prevState,
            isMirrored: false,
          };
        });
        xChange += moveAmount;
      }
      if (pressedKeysRef.current.has("w")) yChange -= moveAmount;
      if (pressedKeysRef.current.has("s")) yChange += moveAmount;

      setPlayer((prevState) => {
        // if player.isAttLocked it means we are still attacking
        // if we are not attacking we check if we made a movement
        // if neither then idle
        let gif;
        if (prevState.isAttLocked) gif = playerAtt;
        else if (xChange || yChange) gif = playerMove;
        else gif = playerIdle;

        return {
          ...prevState,
          gif,
          x: prevState.x + xChange,
          y: prevState.y + yChange,
        };
      });
    };

    const intervalId = setInterval(movePlayer, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
};
