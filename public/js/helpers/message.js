var form = document.getElementById("chat-form");
var msg = document.getElementById("msg");
var chatMessages = document.getElementById("chat-messages");
var notification = document.getElementById("notification");

let scrollHeight = 0;
notification.addEventListener("click", scrollToNewMessages);
chatMessages.onscroll = () => {
  if (scrollHeight < chatMessages.scrollTop)
    scrollHeight = chatMessages.scrollTop + chatMessages.offsetHeight;
};

function scrollToNewMessages() {
  chatMessages.scrollTop = scrollHeight;
  notification.style.display = "none";
}

function scrollToBottom() {
  chatMessages.scrollTop = chatMessages.scrollHeight;
  notification.style.display = "none";
}

function notifyOverflow() {
  if (chatMessages.scrollTop < chatMessages.scrollHeight) {
    console.log("YOU HAVE NEW MESSAGES BELOW");
    notification.style.display = "block";
  }
}

function appendChatMessage(messageInfo) {
  var tag = document.createElement("div");
  tag.classList.add("message");
  var htmlString = `
      <p class="meta">${messageInfo.username}<span> ${messageInfo.timestamp} </span></p>
      <p class="text">${messageInfo.msg}</p>
    `;
  tag.innerHTML = htmlString;
  chatMessages.appendChild(tag);
}

function appendRawMessage(msg) {
  var tag = document.createElement("div");
  var htmlString = `<p class="text" style="margin-bottom: 7px">${msg}</p>`;
  tag.innerHTML = htmlString;
  chatMessages.appendChild(tag);
}
