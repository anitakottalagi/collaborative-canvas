const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let lastPos = null;

let currentColor="black";

export function setColor(color){
    currentColor=color;
}

export function drawLine(start, end, color = currentColor, width = 4) {
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
}

export function clearCanvas(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
}

// Mouse events
canvas.addEventListener("mousedown", (e) => {
  drawing = true;
  lastPos = { x: e.clientX, y: e.clientY };
});

canvas.addEventListener("mouseup", () => {
  drawing = false;
  lastPos = null;
});

canvas.addEventListener("mousemove", (e) => {
  if (!drawing) return;

  const currentPos = { x: e.clientX, y: e.clientY };

  drawLine(lastPos, currentPos,currentColor);

  // send to server
  window.emitDraw(lastPos, currentPos);

  lastPos = currentPos;
});