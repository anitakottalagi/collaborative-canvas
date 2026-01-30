import { drawLine, clearCanvas } from "./canvas.js";

const socket = io("http://localhost:3000");

window.emitDraw = (start, end, color) => {
  socket.emit("draw", { start, end, color });
};

socket.on("draw", (data) => {
  drawLine(data.start, data.end, data.color);
});

socket.on("load", (strokes) => {
  clearCanvas();
  strokes.forEach(s => drawLine(s.start, s.end, s.color));
});

socket.on("reload", (strokes) => {
  clearCanvas();
  strokes.forEach(s => drawLine(s.start, s.end, s.color));
});

window.undo = () => socket.emit("undo");
window.redo = () => socket.emit("redo");

export default socket;