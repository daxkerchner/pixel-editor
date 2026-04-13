// Mr. Kerchner's code in framework.js has these helper functions:

// function setPixel(image, x, y, color)
// function getPixel(image, x, y) returns a color
// function isPixel(image, x, y, color) returns boolean true or false
// In all the above, color is an object { r, g, b }
//    where r, g, and b are numbers between 0 and 255.

// function getCanvasCoord(x, y) converts screen coordinates to pixel coordinates.
// The canvas width and height is stored in the variable DIM = 100
// The UPPER LEFT of the canvas is (0, 0) and the LOWER RIGHT is (99, 99)

MAX_FPS = 30; // Maximum frames per second is set here

// Define colors if you want.
const WHITE = { r: 255, g: 255, b: 255 }
const BLACK = { r: 0, g: 0, b: 0 };

// Mr. Kerchner's code calls start() once at the very beginning.
// This code should fill the initial canvas with a color.
function start() {
  for (let x = 0; x < DIM; x++) {
    for (let y = 0; y < DIM; y++) {
      setPixel(image, x, y, BLACK);
    }
  }
}

// Mr. Kerchner's code calls update() once per frame: MAX_FPS times per second.
// Access the next frame using the variable `image`.
// Access the previous frame using the variable `oldImage`.
function update() {
  for (let y = DIM - 1; y >= 0; y--) {
    for (let x = 0; x < DIM; x++) {
      if (isPixel(image, x, y, BLACK) && isPixel(image, x, y - 1, WHITE)) {
        setPixel(image, x, y, WHITE);
        setPixel(image, x, y - 1, BLACK);
      }
    }
  }
}

// Event listeners (functions that happen when the user does something)

function mousedown(event) {
  const [x, y] = getCanvasCoord(event.clientX, event.clientY);

  setPixel(image, x, y, WHITE);
}

canvas.addEventListener("mousedown", mousedown);

