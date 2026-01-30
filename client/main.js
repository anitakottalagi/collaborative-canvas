import "./canvas.js";
import { setColor } from "./canvas.js";
import socket from "./websocket.js";

console.log("main connected");

document.getElementById("undo").onclick = () => {
  window.undo();
};
  
document.getElementById("redo").onclick = () => {
  window.redo();
};

const colorButtons=document.querySelectorAll(".color-btn");
colorButtons.forEach(btn=>{
    btn.onclick=() =>{
     const color=btn.dataset.color;
     console.log("selected color:",color)
    setColor(color);
    console.log("selected color:",color)
    }
})

socket.on("reload", strokes => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0,0,canvas.width,canvas.height);

  strokes.forEach(s => {
    ctx.beginPath();
    ctx.moveTo(s.start.x, s.start.y);
    ctx.lineTo(s.end.x, s.end.y);
    ctx.stroke();
  });
});
