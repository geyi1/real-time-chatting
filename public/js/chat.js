var socket = io();

var form = document.getElementById("chat-form");
var msg = document.getElementById("msg");
var chatMessages = document.getElementById("chat-messages");
var notification = document.getElementById("notification");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (msg.value) {
    socket.emit("chat message", msg.value);
    msg.value = "";
  }
});

socket.on("chat message", (messageInfo) => {
  appendChatMessage(messageInfo);
  if (messageInfo.username === username) scrollToBottom();
  else notifyOverflow();
});

socket.on("new user", (users) => {
  console.log("appending new user");
  appendUsers(users.userList);
  joinRoom(users.room);
});

socket.on("delete user", (username) => {
  deleteUser(username);
});

socket.on("admin message", (msg) => {
  appendRawMessage(msg);
  // scrollToBottom();
});

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("room");
const info = { username, room };
socket.emit("new user", info);
