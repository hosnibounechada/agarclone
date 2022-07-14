const io = require("../server").io;

const Orb = require("./classes/Orb");
const Player = require("./classes/Player");
const PlayerConfig = require("./classes/PlayerConfig");
const PlayerData = require("./classes/PlayerData");

let orbs = [];
let players = [];
let settings = {
  defaultOrbs: 50,
  defaultSpeed: 6,
  defaultSize: 6,

  defaultZoom: 1.5,
  worldWidth: 500,
  worldHeight: 500,
};

initGame();

setInterval(() => {
  io.to("game").emit("tock", { players });
}, 33);

io.sockets.on("connect", (socket) => {
  socket.on("init", (data) => {
    socket.join("game");
    let playerConfig = new PlayerConfig(settings);
    let playerData = new PlayerData(data.playerName, settings);
    player = new Player(socket.id, playerConfig, playerData);

    socket.emit("initReturn", {
      orbs,
    });
    players.push(player);
  });

  socket.on("tick", (data) => {
    const player = data.player;

    let storedPlayer = players.find(
      (element) => element.playerData.name === player.name
    );

    let degree =
      (180 *
        Math.atan2(
          player.posY - storedPlayer.playerData.locY,
          player.posX - storedPlayer.playerData.locX
        )) /
      Math.PI;

    player.yV = Math.round(
      Math.sin(degree * (Math.PI / 180)) * storedPlayer.playerConfig.speed
    );
    player.xV = Math.round(
      Math.cos(degree * (Math.PI / 180)) * storedPlayer.playerConfig.speed
    );

    storedPlayer.playerData.locY =
      Math.abs(player.posY - storedPlayer.playerData.locY) <
      storedPlayer.playerConfig.speed
        ? player.posY
        : storedPlayer.playerData.locY + player.yV;
    storedPlayer.playerData.locX =
      Math.abs(player.posX - storedPlayer.playerData.locX) <
      storedPlayer.playerConfig.speed
        ? player.posX
        : storedPlayer.playerData.locX + player.xV;
  });
});

function initGame() {
  for (var i = 0; i < 500; i++) {
    orbs.push(new Orb());
  }
}

module.exports = io;
