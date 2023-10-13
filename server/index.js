const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();

app.use(
  cors({
    origin: "https://chat-app-five-iota.vercel.app",
    methods: ["GET", "POST"],
    credentials: true,
    optionsSuccessStatus: 204,
  })
);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "https://chat-app-five-iota.vercel.app/",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected:  ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with id ${socket.id},  joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    // console.log(data);
    socket.to(data.room).emit("reseive_message", data);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected:  ${socket.id}`);
  });
});

server.listen(8000, () => {
  console.log("server running");
});
