import { create } from "zustand";

import { charData } from "../charData";
``;
export const usePlayerStore = create((set) => ({
  isGameOver: false,
  setIsGameOver: (over) =>
    set((state) => ({
      isGameOver: over,
    })),
  player: { ...charData.player },
  enemy: { ...charData.enemy },
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
