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

// Collision detection
function collide(arena, player) {
  const [m, o] = [player.matrix, player.pos];
  for (let y = 0; y < m.length; ++y) {
    for (let x = 0; x < m[y].length; ++x) {
      if (m[y][x] !== 0 &&
          (arena[y + o.y] &&
          arena[y + o.y][x + o.x]) !== 0) {
          return true;
      }
    }
  }
  return false;
}

function createMatrix(w, h) {
  const matrix = [];
  while (h--) {
    matrix.push(new Array(w).fill(0));
  }
  return matrix;
}

//General draw function
function draw() {
  // Filling in canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena, { x: 0, y: 0 });
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

// copying the vale of player into the arena
function merge(arena, player) {
  player.matrix.forEach((row, y) => {
    row.forEach((value, x) => {
      //values that are zero are ignored
      if (value !== 0) {
        // copy value into arena at the correct offset
        arena[y + player.pos.y][x + player.pos.x] = value;
      }
    });
  });
}

function playerDrop() {
  player.pos.y++;
  if (collide(arena, player)) {
    player.pos.y--;
    merge(arena, player);
    player.pos.y = 0;
  }

  // Reseting dropCounter show if we press down another drop wont happened
  dropCounter = 0;
}

//Stopping  player from moving off screen
function playerMove(dir) {
  player.pos.x += dir;
  if (collide(arena, player)) {
    player.pos.x -= dir;
  }
}

let dropCounter = 0;
let dropInterval = 1000; //In milliseconds. Every 1 second should drop

let lastTime = 0;
/* Update Function: Continuously draws the game
using Animation Frame */
function update(time = 0) {
  //formating time so it's easier for us
  const deltaTime = time - lastTime;
  lastTime = time;

  dropCounter += deltaTime;
  /* If our dropCounter is greater than our dropInterval the block should move down, and then reset*/
  if (dropCounter > dropInterval) {
    playerDrop();
  }

  draw();
  requestAnimationFrame(update);
}

// Creating our arena
const arena = createMatrix(12, 20);

//Player structure
const player = {
  pos: { x: 5, y: 5 },
  matrix: matrix,
};

document.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') {
    playerMove(-1);
  } else if (event.key === 'ArrowRight') {
    playerMove(1);
  } else if (event.key === 'ArrowDown') {
    playerDrop();
  }
});
update();
