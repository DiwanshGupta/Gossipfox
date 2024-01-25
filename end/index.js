// server for Gosssipfox
const io = require("socket.io")(800, {
  cors: {
    origin: "*",
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

const users = {};

io.on("connection", (socket) => {
  socket.on("new-user-joined", (Name) => {
    console.log("Name user", Name);
    users[socket.id] = Name;
    socket.broadcast.emit("user-joined", Name);
  });
  socket.on("send", (message) => {
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });

    socket.on("disconnect", (message) => {
      socket.broadcast.emit("left", users[socket.id]);
      delete users[socket.id];
    });
  });
});
