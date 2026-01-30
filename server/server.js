const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// ✅ Serve client folder
app.use(express.static(path.join(__dirname, "../client")));

// ✅ Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

let strokes=[];
let redoStack=[];


io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send existing drawing to new user
  socket.emit("load", strokes);

  socket.on("draw", (data) => {
    strokes.push(data);
    redoStack = []; // clear redo on new draw
    socket.broadcast.emit("draw", data);
  });

  socket.on("undo", () => {
    if (strokes.length === 0) return;
    const last = strokes.pop();
    redoStack.push(last);
    io.emit("reload", strokes);
  });

  socket.on("redo", () => {
    if (redoStack.length === 0) return;
    const redoStroke = redoStack.pop();
    strokes.push(redoStroke);
    io.emit("reload", strokes);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});