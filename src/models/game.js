import { Room } from "./room.js";

export class Game {
  #rooms;

  constructor() {
    this.#rooms = [];
  }

  /** @param {Room} */
  setRoom(room) {
    this.#rooms.push(room);
  }
}
