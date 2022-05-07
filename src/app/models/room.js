export class Room {
  #matchs;

  constructor() {
    this.#matchs = [];
  }

  setMatch(match) {
    this.#matchs.push(match);
  }
}
