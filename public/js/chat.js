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
    <p class="meta">${messageInfo.username}<span> 10:00 PM </span></p>
    <p class="text">${messageInfo.msg}</p>
  `;
  tag.innerHTML = htmlString;
  chatMessages.appendChild(tag);
}

function appendUser(username) {
  var tag = document.createElement("li");
  tag.innerHTML = `${username}`;
  var userList = document.getElementById("users");
  userList.appendChild(tag);

  //   var roomList = document.getElementById("room-name");
  //   roomList.innerHTML = `${info.room}`;
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

socket.on("message", (messageInfo) => {
  appendChatMessage(messageInfo);
});

socket.on("new user", (users) => {
  console.log("appending new user");
  appendUsers(
    users.map((each) => {
      return each.username;
    })
  );
});

socket.on("delete user", (username) => {
  deleteUser(username);
});

// socket.on("disconnect", (info) => {
//     console.lo
// })
