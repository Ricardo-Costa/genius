import configs from "./../configs/index.js";

export class Player {
  #scores;
  #power;
  #specials;

  constructor({ nickName }) {
    this.nickName = nickName;
    this.#scores = configs.DEFAULT_START_SCORE;
    this.#power = 0;
    this.#specials = 0;
  }
}
