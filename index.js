const {
  addUser,
  getRoomUsers,
  removeUser,
  findUser,
} = require("./helpers/users");
const { getTimeInAmPm } = require("./helpers/time");

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
    console.log("a user disconnected");
    let username = removeUser(socket.id);
    io.emit("delete user", username);
  });
  socket.on("new user", (info) => {
    clientId = socket.id;
    socket.join(info.room);
    addUser(info, clientId);
    let userList = getRoomUsers(info.room);
    io.to(info.room).emit("new user", { room: info.room, userList });
  });
  socket.on("chat message", (msg) => {
    let userInfo = findUser(socket.id);
    let username = userInfo.username;
    let rooms = userInfo.rooms;
    let messageInfo = {
      username,
      msg,
      timestamp: getTimeInAmPm(),
    };
    for (let each of rooms) {
      io.to(each).emit("chat message", messageInfo);
    }
  });
});

server.listen(PORT, () => {
  console.log(`server is listening on the port ${PORT}`);
});
