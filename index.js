import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from "cors";
import { PORT } from "./config.js";

const api = express();

const server = http.createServer(api);
const io = new SocketServer(server, {
  cors: {
    origin: "*",
  },
});

api.use(cors());

api.use(morgan("dev"));

io.on("connection", (socket) => {
  socket.on("sendMessage", (message) => {
    socket.broadcast.emit("sendMessage", { user: socket.id, text: message });
  });
});

server.listen(PORT);

console.log(" server started on port:", PORT);
