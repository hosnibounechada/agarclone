const express = require("express");
const server = require("socket.io");

const app = express();

app.use(express.static(__dirname + "/public"));

const http = app.listen(3000, () =>
  console.log("server is running on port 3000")
);

const io = server(http);
