const express = require("express");
const server = require("socket.io");
const helmet = require("helmet");

const app = express();

app.use(express.static(__dirname + "/public"));
app.use(helmet());

const http = app.listen(3000);

const io = server(http);

console.log("express and socket.io are running on port 3000");

module.exports = {
  app,
  io,
};
