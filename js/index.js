let img = new Image();
img.src = "assets/chicken-sprite-sheet.png";
img.onload = function () {
  init();
};

let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

// Sprite dimensions in spritesheet (in px)
const spriteWidth = 46;
const spriteHeight = 45;
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

// Index is each "frame" of animation
const walkingAnimationLoop = [2, 3, 4, 5, 6];
let currentLoopIndex = 0;
let frameCount = 0;
const nextFrameThreshold = 15;

function step() {
  // Since requestAnimationFrame is called to match screen refresh rate, animation matches that speed (ex: 60fps)
  // Manually slow it down to 1 frame every 15 seconds
  frameCount++;
  if (frameCount < nextFrameThreshold) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;

  // Clear canvas before drawing next animation frame. Prevents "stacking"/presistent of previous draws.
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawFrame(walkingAnimationLoop[currentLoopIndex], 0, 0, 0);
  currentLoopIndex++;
  if (currentLoopIndex >= walkingAnimationLoop.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
}
