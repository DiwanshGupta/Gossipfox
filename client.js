const socket = io("http://localhost:800");
const form = document.getElementById("send-container");
const messageInput = document.getElementById("mesgin");
const messageContainer = document.querySelector(".container");
// To define Notification
var sound = new Audio("notfic.wav");

const Name = prompt("Enter your name for join Gossips");
socket.emit("new-user-joined", Name);

// Socket Function for user joined
socket.on("user-joined", (Name) => {
  {
    append(`${Name} :joined the Chat`, "mid");
  }
});
// TO show the Enter user to all members
const append = (message, position) => {
  const messageElement = document.createElement("div");
  messageElement.innerText = message;
  messageElement.classList.add("message");
  messageElement.classList.add(position);
  messageContainer.append(messageElement);
  if (position == "left" || position == "mid") {
    sound.play();
  }
};

// For send message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`${message}`, "right");
  socket.emit("send", message);
  messageInput.value = "";
});

// For Receive message
socket.on("receive", (data) => {
  {
    append(`${data.name}:${data.message}`, "left");
  }
});
// if someone get disconnect
socket.on("left", (name) => {
  {
    append(`${name} Left the chat`, "mid");
  }
});
