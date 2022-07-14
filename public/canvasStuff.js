function init() {
  draw();
  console.log(orbs);
}

// player.locX = Math.floor(500 * Math.random() + 10);
// player.locY = Math.floor(500 * Math.random() + 10);

player.locX = 350;
player.locY = 350;

player.xV = 0;
player.yV = 0;

const speed = 3;

function draw() {
  let degree =
    (180 * Math.atan2(player.posY - player.locY, player.posX - player.locX)) /
    Math.PI;

  player.yV = Math.round(Math.sin(degree * (Math.PI / 180)) * speed);
  player.xV = Math.round(Math.cos(degree * (Math.PI / 180)) * speed);

  player.locY =
    Math.abs(player.posY - player.locY) < speed
      ? player.posY
      : player.locY + player.yV;
  player.locX =
    Math.abs(player.posX - player.locX) < speed
      ? player.posX
      : player.locX + player.xV;

  context.setTransform(1, 0, 0, 1, 0, 0);
  context.clearRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.fillStyle = "rgb(255,0,0)";
  context.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
  context.fill();
  context.lineWidth = 3;
  context.strokeStyle = "rgb(0,255,0)";
  context.stroke();

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
