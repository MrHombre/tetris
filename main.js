const canvas = document.getElementById('tetris');
const context = canvas.getContext('2d');

// Just making it bigger to see
context.scale(20, 20);

//Creating More Pieces
function createPiece(type) {
  if (type === 'T') {
    return [
          [0, 0, 0],
          [1, 1, 1],
          [0, 1, 0],
      ];
  } else if (type === 'O') {
    return [
          [2, 2],
          [2, 2],
      ];
  } else if (type === 'L') {
    return [
          [0, 3, 0],
          [0, 3, 0],
          [0, 3, 3],
      ];
  } else if (type === 'J') {
    return [
          [0, 4, 0],
          [0, 4, 0],
          [4, 4, 0],
      ];
  } else if (type === 'I') {
    return [
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
          [0, 5, 0, 0],
      ];
  } else if (type === 'S') {
      return [
          [0, 6, 6],
          [6, 6, 0],
          [0, 0, 0],
      ];
  } else if (type === 'Z') {
        return [
            [7, 7, 0],
            [0, 7, 7],
            [0, 0, 0],
      ];
  }
}

//General draw function
function draw() {
  // Filling in canvas
  context.fillStyle = '#000';
  context.fillRect(0, 0, canvas.width, canvas.height);

  drawMatrix(arena.matrix, { x: 0, y: 0 });
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
        // adding colorPP
        context.fillStyle = colors[value];
        // x=left, y=right, 1=width, 1=height
        context.fillRect(x + offset.x, // offset should let us move
                         y + offset.y, // blocks later
                         1, 1);
      }
    });
  });
}

let lastTime = 0;
/* Update Function: Continuously draws the game
using Animation Frame */
function update(time = 0) {
  //formating time so it's easier for us
  const deltaTime = time - lastTime;
  lastTime = time;

  player.update(deltaTime);

  draw();
  requestAnimationFrame(update);
}

// Score
function updateScore() {
  document.getElementById('score').innerText = player.score;
}

// Colors for our Pieces
const colors = [
  null,
  '#e11818',
  '#47909a',
  '#f4ce58',
  '#368900',
  '#694086',
  '#FFA500',
  '#e5acb6',
]

// Creating our arena
const arena = new Arena(12, 20);

//Player Structure
const player = new Player;

// Using Keycode instead of key
document.addEventListener('keydown', event => {
  if (event.keyCode === 37) {
    player.move(-1);
  } else if (event.keyCode === 39) {
    player.move(1);
  } else if (event.keyCode === 40) {
    player.drop();
  } else if (event.keyCode === 81) {
    player.rotate(-1);
  } else if (event.keyCode === 87) {
    player.rotate(1);
  }
});

player.reset();
updateScore();
update();