class Tetris
{
	constructor()
	{
		// Colors for our Pieces
		this.colors = [
		  null,
		  '#FF0D72',
		  '#0DC2FF',
		  '#0DFF72',
		  '#F538FF',
		  '#FF8E0D',
		  '#FFE138',
		  '#3877FF',
		];

		let lastTime = 0;
		/* Update Function: Continuously draws the game
		using Animation Frame */
		const update = (time = 0) => {
		  //formating time so it's easier for us
		  const deltaTime = time - lastTime;
		  lastTime = time;

		  player.update(deltaTime);

		  this.draw();
		  requestAnimationFrame(update);
		};

		update();
	}

	//General draw function
	draw() 
	{
	  // Filling in canvas
	  context.fillStyle = '#000';
	  context.fillRect(0, 0, canvas.width, canvas.height);

	  this.drawMatrix(arena.matrix, { x: 0, y: 0 });
	  //Calling player
	  this.drawMatrix(player.matrix, player.pos);
	}

	//Wrapping maxtix in a function
	drawMatrix(matrix, offset) 
	{
	  // Drawing the first piece
	  matrix.forEach((row, y) => {
	    // Iterating over the row
	    row.forEach((value, x) => {
	      // Checking to make sure the value isn't 0
	      if (value !== 0) {
	        // adding colorPP
	        context.fillStyle = this.colors[value];
	        // x=left, y=right, 1=width, 1=height
	        context.fillRect(x + offset.x, // offset should let us move
	                         y + offset.y, // blocks later
	                         1, 1);
	      }
	    });
	  });
	}
}