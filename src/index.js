import { Player } from "./models/player.js";
import { Match } from "./models/match.js";
import { Room } from "./models/room.js";
import { Game } from "./models/game.js";

const playerPc = new Player({
  nickName: "Player PC",
});
const player = new Player({
  nickName: "Player 1",
});

/** @type {Match} */
const match = new Match();
match.addPlayer(playerPc);
match.addPlayer(player);

/** @type {Room} */
const roomOne = new Room();
roomOne.setMatch(match);

/** @type {Game} */
const game = new Game();
game.setRoom(roomOne);
