const {
  addUser,
  getRoomUsers,
  removeUser,
  findUser,
} = require("./helpers/users");
const {getTimeInAmPm} = require('./helpers/time');

const express = require("express");
const app = express();
const http = require("http");
const { isObject } = require("util");
const server = http.createServer(app);
const { Server } = require("socket.io");
const { emit } = require("process");
const io = new Server(server);

const PORT = 4000;

app.use(express.static("public"));

io.on("connect", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    let username = removeUser(socket.id);
    io.emit("delete user", username);
  });
  socket.on("new user", (info) => {
    info.clientId = socket.id;
    addUser(info);
    let userList = getRoomUsers(info.room);
    io.emit("new user", userList);
  });
  socket.on("chat message", (msg) => {
    let messageInfo = findUser(socket.id);
    messageInfo.msg = msg;
    messageInfo.timestamp = getTimeInAmPm();
    io.emit("chat message", messageInfo);
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on the port ${PORT}`);
});
