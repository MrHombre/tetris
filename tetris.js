const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Just making it bigger to see
context.scale(20, 20);

/* Matrix to build the tetris blocks
   Thanks smarter people */
const matrix = [
      [0, 0, 0],
      [1, 1, 1],
      [0, 1, 0],
];

//General draw function
function draw() {
  // Filling in canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  //Calling player
  drawMatrix(player.matrix, player.pos);
}

//Wrapping maxtix in a function
function drawMatrix(matrix, offset) {
  // Drawing the first piece
  matrix.forEach((row, y) => {
    // Iterating over the row
    row.forEach((value, x) => {
      // Checking to make sure the value isn't 0
      if (value !== 0) {
        // if the value is not 0 then we draw
        context.fillStyle = 'red';
        // x=left, y=right, 1=width, 1=height
        context.fillRect(x + offset.x, // offset should let us move
                         y + offset.y, // blocks later
                         1, 1);
      }
    });
  });
}

let dropCounter = 0;
let dropInterval = 1000; //In milliseconds. Every 1 second should drop

let lastTime = 0;
/* Update Function: Continuously draws the game
using Animation Frame */
function update(time = 0) {
  //formating time so it's easier for us
  const deltaTime = time -lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  /* If our dropCounter is greater than our dropInterval the block should move down, and then reset*/
  if (dropCounter > dropInterval) {
    player.pos.y++;
    dropCounter = 0;
  }

  draw();
  requestAnimationFrame(update);
}

//Player structure
const player = {
  pos: {x:5, y:5},
  matrix: matrix,
}

update();
