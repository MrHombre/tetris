const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();

//establish a connection with main.js
const connectionManager = new ConnectionManager();

connectionManager.connect('ws://localhost:9000');

const keyListener = (event) => {
  [
    [65, 68, 81, 69, 83], //left = a, right = d , rotate q&e. drop s = Player One
    [72, 75, 89, 73, 74], //left = h, right = k , rotate y&i. drop j = Player Two
  ].forEach((key, index) => {
      const player = localTetris.player;
      if (event.type === 'keydown') {
        if (event.keyCode === key[0]) {
          player.move(-1);
        } else if (event.keyCode === key[1]) {
          player.move(1);
        } else if (event.keyCode === key[2]) {
          player.rotate(-1);
        } else if (event.keyCode === key[3]) {
          player.rotate(1);
        }
      }

      if (event.keyCode === key[4]) {
          if (event.type === 'keydown') {
              if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
              }             
              } else {
                player.dropInterval = player.DROP_SLOW;
              } 
      }
  }); 
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);