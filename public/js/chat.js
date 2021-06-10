var socket = io();

var form = document.getElementById("chat-form");
var msg = document.getElementById("msg");
var chatMessages = document.getElementById("chat-messages");

const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");
const room = urlParams.get("room");
const info = { username, room };
socket.emit("new user", info);

function appendChatMessage(messageInfo) {
  var tag = document.createElement("div");
  tag.classList.add("message");
  var htmlString = `
    <p class="meta">${messageInfo.username}<span> ${messageInfo.timestamp} </span></p>
    <p class="text">${messageInfo.msg}</p>
  `;
  tag.innerHTML = htmlString;
  chatMessages.appendChild(tag);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendRawMessage(msg) {
  var tag = document.createElement("div");
  var htmlString = `<p class="text" style="margin-bottom: 7px">${msg}</p>`;
  tag.innerHTML = htmlString;
  chatMessages.appendChild(tag);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function appendUser(username) {
  var tag = document.createElement("li");
  tag.innerHTML = `${username}`;
  var userList = document.getElementById("users");
  userList.appendChild(tag);
}

function joinRoom(room) {
  var roomList = document.getElementById("room-name");
  roomList.innerHTML = `${room}`;
}

function deleteUser(username) {
  console.log("in deleteUser");
  var parent = document.getElementById("users");
  var userList = parent.children;
  for (let i = 0; i < userList.length; i++) {
    var user = userList[i];
    if (user.innerHTML === username) parent.removeChild(user);
  }
}

function appendUsers(users) {
  var userList = document.getElementById("users");
  var htmlString = users
    .map((each) => {
      return `<li>${each}</li>`;
    })
    .join("");
  userList.innerHTML = htmlString;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (msg.value) {
    socket.emit("chat message", msg.value);
    msg.value = "";
  }
});

socket.on("chat message", (messageInfo) => {
  appendChatMessage(messageInfo);
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
});
