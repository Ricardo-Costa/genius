import { GameStatus } from "../types/game-status.type"

export const genereteInitialStatus = (): GameStatus => {
  return {
    theSequence: [ 3, 0, 1, 2 ],
    sequence: [],
    level: 1,
  }
}