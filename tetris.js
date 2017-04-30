class Tetris
{
	constructor(element)
	{
		this.element = element;
		this.canvas = element.querySelector('canvas');
		this.context = this.canvas.getContext('2d');
		this.context.scale(20, 20);

		// Creating our arena
		this.arena = new Arena(12, 20);

		//Player Structure
		this.player = new Player(this);//giving player inst

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

		  this.player.update(deltaTime);

		  this.draw();
		  requestAnimationFrame(update);
		};

		update();
	}

	//General draw function
	draw() 
	{
	  // Filling in canvas
	  this.context.fillStyle = '#000';
	  this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	  this.drawMatrix(this.arena.matrix, { x: 0, y: 0 });
	  //Calling player
	  this.drawMatrix(this.player.matrix, this.player.pos);
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
	        this.context.fillStyle = this.colors[value];
	        // x=left, y=right, 1=width, 1=height
	        this.context.fillRect(x + offset.x, // offset should let us move
	                         y + offset.y, // blocks later
	                         1, 1);
	      }
	    });
	  });
	}

	// Score
	updateScore(score) 
	{
	  this.element.querySelector('score').innerText = score;
	}
}