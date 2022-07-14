let socket = io.connect("http://localhost:3000");

function init() {
  draw();
  socket.emit("init", { playerName: player.name });
}

socket.on("initReturn", (data) => {
  orbs = data.orbs;
  setInterval(() => {
    socket.emit("tick", {
      player,
    });
  }, 33);
});

socket.on("tock", (data) => {
  players = data.players;
});
