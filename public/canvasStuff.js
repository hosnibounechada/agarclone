// player.locX = Math.floor(500 * Math.random() + 10);
// player.locY = Math.floor(500 * Math.random() + 10);

player.locX = 350;
player.locY = 350;

player.xV = 0;
player.yV = 0;

const speed = 3;

function draw() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  // Draw players
  players.forEach((p) => {
    context.beginPath();
    context.fillStyle = p.playerData.color;
    context.arc(p.playerData.locX, p.playerData.locY, 10, 0, Math.PI * 2);
    context.fill();
    context.lineWidth = 3;
    context.strokeStyle = "rgb(0,255,0)";
    context.stroke();
  });
  // Draw orbs
  orbs.forEach((orb) => {
    context.beginPath();
    context.fillStyle = orb.color;
    context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
    context.fill();
  });

  requestAnimationFrame(draw);
}

canvas.addEventListener("mousemove", (event) => {
  player.posX = event.clientX;
  player.posY = event.clientY;
});
