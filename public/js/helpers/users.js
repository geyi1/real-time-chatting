var form = document.getElementById("chat-form");
var msg = document.getElementById("msg");
var chatMessages = document.getElementById("chat-messages");
var notification = document.getElementById("notification");

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
