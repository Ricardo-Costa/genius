import { Player } from "./player.js";

export class Match {
  #players;
  #startDate;
  #endDate;

  constructor() {
    this.#players = [];
    this.#startDate = new Date();
    this.#endDate = new Date();
  }

  /** @param {Player} */
  addPlayer(player) {
    this.#players.push(player);
  }

  start() {}
}
