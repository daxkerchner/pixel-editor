// CONSTANTS

// Students: you can edit these but you must also change them in
// index.html.
const DIM = 100;
const ZOOM = 6;

// FRAME LIFECYCLE

// derived from https://www.aleksandrhovhannisyan.com/blog/javascript-game-loop/
let MAX_FPS = 30;
let previousTimeMs = 0;
function updateWrapper() {
  requestAnimationFrame((currentTimeMs) => {
    const deltaTimeMs = currentTimeMs - previousTimeMs;
    let FRAME_INTERVAL_MS = 1000 / MAX_FPS;
    if (deltaTimeMs >= FRAME_INTERVAL_MS) {
      update();
      // Synchronize next frame to arrive on time
      previousTimeMs = currentTimeMs - (deltaTimeMs % FRAME_INTERVAL_MS);
    }
    drawWrapper();
    updateWrapper();
  });
}

const canvas = document.getElementById("app");
const ctx = canvas.getContext("2d");
let oldImage = ctx.createImageData(DIM, DIM);
let image = oldImage;

function drawWrapper() {
  oldImage = image;
  ctx.putImageData(image, 0, 0);
  var dst = ctx.createImageData(oldImage.width, oldImage.height);
  dst.data.set(oldImage.data);
  image = dst;
}

function startWrapper() {
  start();
  ctx.putImageData(image, 0, 0);
  updateWrapper();
}

// HELPER FUNCTIONS FOR STUDENTS

//    sets the color of image at pixel coordinates (x, y).
function setPixel(image, x, y, { r, g, b }) {
  const rPos = image.width * y * 4 + x * 4;
  image.data[rPos] = r;
  image.data[rPos + 1] = g;
  image.data[rPos + 2] = b;
  image.data[rPos + 3] = 255;
}

//    returns the color of the image at pixel coordinates (x, y).
//    color is an object { r, g, b }
function getPixel(image, x, y) {
  let rPos = image.width * y * 4 + x * 4;
  return {
    r: image.data[rPos],
    g: image.data[rPos + 1],
    b: image.data[rPos + 2],
  };
}

//    returns boolean true or false
//    depending if the pixel (x, y) in the image is the provided color.
function isPixel(image, x, y, { r, g, b }) {
  const pixel = getPixel(image, x, y);
  return r == pixel.r && g == pixel.g && b == pixel.b;
}

//    takes screen coordinates as input
//    and returns pixel coordinates between 0 and DIM - 1.
function getCanvasCoord(inX, inY) {
  const bounding = canvas.getBoundingClientRect();
  const x = Math.floor((inX - bounding.left) / ZOOM);
  const y = Math.floor((inY - bounding.top) / ZOOM);
  return [x, y];
}