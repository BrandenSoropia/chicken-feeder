let img = new Image();
img.src = "assets/chicken-sprite-sheet.png";
img.onload = function () {
  init();
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Sprite dimensions in spritesheet (in px)
const spriteWidth = 32;
const spriteHeight = 32;
// Used to multiple sprite scale since it's a tiny pixel art.
const scale = 2;
const scaledSpriteWidth = scale * spriteWidth;
const scaledSpriteHeight = scale * spriteHeight;

function init() {
  // Draw initial animation frame
  drawFrame(animationCycleLoop[currentLoopIndex], 0, 0, 0);
}

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX * spriteWidth,
    frameY * spriteHeight,
    spriteWidth,
    spriteHeight,
    canvasX,
    canvasY,
    scaledSpriteWidth,
    scaledSpriteHeight
  );
}

window.requestAnimationFrame(step);

// Index is each "frame" of animation. Our sprite sheet has 3 frames per animation.
const animationFrames = [0, 1, 2];
let currentLoopIndex = 0;
let frameCount = 0;
const nextFrameThreshold = 15;

/**
 * Clear canvas before drawing next animation frame to
 * prevens "stacking"/presisting previous draws.
 * */
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function step() {
  /**
   * Since requestAnimationFrame is called to match screen refresh rate,
   * canvas is redrawn at same speed. The animations are super simple,
   * so only change animation frame after a given threshold of refreshes
   * so it doesn't flip out!
   */
  frameCount++;
  if (frameCount < nextFrameThreshold) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;

  clearCanvas();

  drawFrame(animationFrames[currentLoopIndex], 3, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= animationFrames.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}
