# About

This is a simple javascript framework for 5th graders.  It is more flexible than code.org and more advanced than Scratch.  The focus is not teaching theoretical coding concepts—the focus is learning about how the computer follows instructions in order, and being able to make the computer do something else.

# Setup

Use this in your browser via the website [vscode.dev](https://vscode.dev]).  You'll need a GitHub account—ask an adult to help you get set up with this.

# Getting started

Edit script.js to add your code.

To get started, try changing the number after MAX_FPS to a different number, or the numbers in the lines that start with `const WHITE` and `const BLACK`.

# Functions and objects in script.js

## MAX_FPS

Change the number in `MAX_FPS = 30;` to set the maximum frames per second.

## Colors

Define colors by adding lines under the lines that start with `const WHITE` and `const BLACK`.  Every color looks like this:
`const COLOR_NAME = { r: #, g: #, b: #}` where you replace # with numbers between 0 and 255.  Each number controls how much red, green, and blue light contributes to the pixel on the screen.  You can figure out what colors you want using [https://rgbcolorpicker.com/](rgbcolorpicker.com).  Here are a couple examples:

`const YELLOW = { r: 255, g: 255, b: 0 };` — yellow is all red and green light, and no blue.

`const GRAY = { r: 128, g: 128, b: 128 };` — 128 is about halfway between 0 and 255.  This uses half of each color of light.

## start()

Mr. Kerchner's code calls start() once at the very beginning.  Usually, this code should fill the initial canvas with a color.  But if you want to do something more complicated before the animation even starts, you can add it here.  Here is example code:

```
function start() {
  for (let x = 0; x < DIM; x++) {
    for (let y = 0; y < DIM; y++) {
      setPixel(image, x, y, BLACK);
    }
  }
}
```

Suppose you wanted to change the background to _blue_—can you figure out how?  _(Hint: the word "BLUE" means nothing to the computer until you add it in the color section in the code higher in the file!)_

## update()

Mr. Kerchner's code calls update() once per frame: MAX_FPS times per second.
Access the next frame using the variable `image`.
Access the previous frame using the variable `oldImage`.
For more information on what code you can write here, see **Functions you can call** below.

This makes white pixels fall to the bottom as if by gravity:

```
function update() {
  for (let y = DIM - 1; y >= 0; y--) { // start from the bottom and move up, so rows don't collide with each other
    for (let x = 0; x < DIM; x++) {
      if (isPixel(image, x, y, BLACK) && isPixel(image, x, y - 1, WHITE)) {
        setPixel(image, x, y, WHITE);
        setPixel(image, x, y - 1, BLACK);
      }
    }
  }
}
```

## Event listeners

Event listeners are functions that happen when the user does something.  They have two parts—defining what the code does, and telling Javascript when to run it.  For example:

**Defining what "mousedown()" does**—it draws white pixels on the screen:

```
function mousedown(event) {
  const [x, y] = getCanvasCoord(event.clientX, event.clientY);

  setPixel(image, x, y, WHITE);
}
```

**Telling Javascript to run mousedown() when** the users clicks the mouse on the canvas:

```
canvas.addEventListener("mousedown", mousedown);
```

That last line looks redundant, but it is necessary.

Here are various events available:

```
mousedown
mouseup
mousemove
dblclick
keydown
```

(If you use keydown, access the key name using `event.key` inside your function.)

You can add more events to the code.  Remember to always include both the _function definition_ and `canvas.addEventListener`.

# Functions you can call

Mr. Kerchner's code in framework.js has these helper functions.

In general, `x` is the horizontal position (left == 0, right == 99) and `y` is the vertical position (top == 0, bottom == 99).  The number of pixels across and down is stored in DIM = 100 in framework.js.  So, the bottom and right sides of the image are also represented by DIM - 1 (which is the same as 99).  You can change the number in framework.js, but if you do, you also have to change wherever 100 appears in index.htm.

- `function setPixel(image, x, y, color)` modifies image `image` to set the pixel at position (`x`, `y`) to color `color`.

- `function getPixel(image, x, y)` returns the **color** of the pixel at position `(x, y)` in image `image`.  Access the next frame by using `image` here.  Access the previous frame by using `oldImage` here instead.

- `function isPixel(image, x, y, color)`returns boolean true or false which you can use inside the parentheses in if statements.  It only returns true if the image inputted has the exact color given at position (`x`, `y`).

- `function getCanvasCoord(x, y)` converts screen coordinates to pixel coordinates.  Use this function by adding this line to the top of your **event listener function definitions**:

```
  const [x, y] = getCanvasCoord(event.clientX, event.clientY);
```

After that line you can use x and y to refer to the pixel that was clicked, moved over, etc.

# Advanced

You can add button and text inputs to the page outside the canvas using the .htm file.  Talk to Mr. Kerchner if you'd like to learn how to add these.
