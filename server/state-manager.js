let strokes = [];

function addStroke(stroke) {
  strokes.push(stroke);
}

function getStrokes() {
  return strokes;
}

function undoStroke(userId) {
  for (let i = strokes.length - 1; i >= 0; i--) {
    if (strokes[i].user === userId) {
      strokes.splice(i, 1);
      break;
    }
  }
}

module.exports = { addStroke, getStrokes, undoStroke };
