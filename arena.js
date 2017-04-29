class Arena
{
	constructor(w, h)
	{
		const matrix = [];
	  	while (h--) {
	    	matrix.push(new Array(w).fill(0));
	  }
	  this.matrix = matrix;
	}

	clear()
	{
		this.matrix.forEach(row => row.fill(0));
	}

	// copying the vale of player into the arena
	merge(player) 
	{
	  player.matrix.forEach((row, y) => {
	    row.forEach((value, x) => {
	      //values that are zero are ignored
	      if (value !== 0) {
	        // copy value into arena at the correct offset
	        this.matrix[y + player.pos.y][x + player.pos.x] = value;
	      }
	    });
	  });
	}

	// Adding the tetris to tetris
	sweep() 
	{
	  let rowCount = 1;
	  outer: for (let y = this.matrix.length - 1; y > 0; --y) {
	    for (let x = 0; x < this.matrix.length; ++x) {
	      if (this.matrix[y][x] === 0) {
	          continue outer;
	      }
	    }

	    const row = this.matrix.splice(y, 1)[0].fill(0);
	    this.matrix.unshift(row);
	    ++y;

	    player.score += rowCount * 10;
	    rowCount *= 2;
	  }
	}
}
