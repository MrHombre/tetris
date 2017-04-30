//Player structure hopefully working for 2-player
class Player
{
	constructor(tetris)
	{
		this.DROP_SLOW = 1000;
		this.DROP_FAST = 50;

		this.tetris = tetris;
		this.arena = tetris.arena;

		//Pretty riskiy having it global so changing that
		this.dropCounter = 0;
		this.dropInterval = this.DROP_SLOW; //In milliseconds. Every 1 second should drop

		this.pos = { x: 0, y: 0 };
  		this.matrix = null;
  		this.score = 0;

  		this.reset();
	}

	drop() 
	{
		this.pos.y++;
		if (this.arena.collide(this)) {
		  debugger;
		  this.pos.y--;
		  this.arena.merge(this);
		  this.reset();
		  this.score += this.arena.sweep();
		  this.tetris.updateScore(this.score);
	  }

	  // Reseting dropCounter show if we press down another drop wont happened
	  this.dropCounter = 0;
	}

	//Stopping  player from moving off screen
	move(dir) 
	{
		this.pos.x += dir;
		if (this.arena.collide(this)) {
			this.pos.x -= dir;
	  }
	}

	// Getting Random Pieces
	reset() 
	{
		const pieces = 'ILJOTSZ'
		this.matrix = createPiece(pieces[pieces.length * Math.random() | 0]);
		this.pos.y = 0;
		this.pos.x = (this.arena.matrix[0].length / 2 | 0) -
		               (this.matrix[0].length / 2 | 0);
		 // Ending the game when arena.collide at the top
		 if (this.arena.collide(this)) {
		    this.arena.clear();
		    this.score = 0;
		    updateScore();
	  }
	}

	// Player rotate
	rotate(dir) 
	{
		//reset offset
		const pos = this.pos.x;

		 //init offset varible
		 let offset = 1;
		 this._rotateMatrix(this.matrix, dir);
		 while (this.arena.collide(this)) {
		   this.pos.x += offset; //this move use to the right or checks if clear
		   offset = -(offset + (offset > 0 ? 1 : -1));

		   // Bail incase it didnt work
		   if (offset > this.matrix[0].length) {
		     this._rotateMatrix(this.matrix, -dir);
		     this.pos.x = pos;
		     return;
	    }
	  }
	}

	// Rotating blocks
	_rotateMatrix(matrix, dir) 
	{
	  for (let y = 0; y < matrix.length; ++y) {
	    for (let x = 0; x < y; ++x) {
	      [
	          matrix[x][y],
	          matrix[y][x],
	      ] = [
	          matrix[y][x],
	          matrix[x][y],
	      ];
	    }
	  }

	  if (dir > 0) {
	    matrix.forEach(row => row.reverse());
	  } else {
	    matrix.reverse();
	  }
	}

	update(deltaTime)
	{
		this.dropCounter += deltaTime;
		/* If our dropCounter is greater than our dropInterval the block should move down, and then reset*/
		if (this.dropCounter > this.dropInterval) {
		  this.drop();
		}
	}

}

