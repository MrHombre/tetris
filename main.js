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


// Score
function updateScore() {
  document.getElementById('score').innerText = tetris.player.score;
}

const tetri = [];

const playerElements = document.querySelectorAll('.player');
[...playerElements].forEach(element => {

    const canvas = element.querySelector('canvas');
    const tetris = new Tetris(canvas);
    tetri.push(tetris);
});



// Using Keycode instead of key
document.addEventListener('keydown', event => {
  [
    [37, 39, 81, 87, 40],
  ].forEach((key, index) => {
      const player = tetri[index].player;
      if (event.keyCode === key[0]) {
        player.move(-1);
      } else if (event.keyCode === key[1]) {
        player.move(1);
      } else if (event.keyCode === key[2]) {
        player.rotate(-1);
      } else if (event.keyCode === key[3]) {
        player.rotate();
      } else if (event.keyCode === key[4]) {
        player.drop();
      }
    }); 
});

updateScore(); 
