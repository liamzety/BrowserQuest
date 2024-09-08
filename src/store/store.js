import { create } from "zustand";
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
``;
export const usePlayerStore = create((set) => ({
  player: {
    isMirrored: false,
    isAttLocked: false,
    gif: playerIdle,
    x: 0,
    y: 0,
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
    name: "my name",
    portrait: null,
    lvl: 1,
    type: "player",
    hp: 100,
    currHp: 100,
    currMana: 100,
    mana: 100,
    manaRegen: 15,
    skills: [
      {
        name: "basic_attack",
        manaCost: 0,
        baseDmg: 10,
      },
      {
        name: "double_attack",
        manaCost: 15,
        baseDmg: 8,
      },
      {
        name: "spell_fireball",
        manaCost: 25,
        baseDmg: 15,
      },
      {
        name: "heal",
        manaCost: 50,
        baseHeal: 25,
      },
    ],
  },

  enemy: {
    isMirrored: true,
    isAttLocked: false,
    gif: enemyIdle,
    x: 0,
    y: 0,
    dmgModel: {
      amount: null,
      isCrit: false,
      isShown: true,
    },
    name: "Big Bad Wizard",
    isSelected: true,
    lvl: 1,
    type: "enemy",
    hp: 125,
    currHp: 125,
    currMana: 50,
    mana: 50,
    manaRegen: 15,
    skills: [
      {
        name: "att1",
        manaCost: 0,
        baseDmg: 5,
      },
      {
        name: "att2",
        manaCost: 25,
        baseDmg: 10,
      },
      {
        name: "heal",
        manaCost: 50,
        baseHeal: 15,
      },
    ],
  },
  setPlayer: (updateFn) =>
    set((state) => ({
      player: updateFn(state.player),
    })),
  setPlayerAttLock: (lock) =>
    set((state) => ({
      player: { ...state.player, isAttLocked: lock },
    })),
  setEnemy: (updateFn) =>
    set((state) => ({
      enemy: updateFn(state.enemy),
    })),
  setEnemyAttLock: (lock) =>
    set((state) => ({
      enemy: { ...state.enemy, isAttLocked: lock },
    })),
}));
