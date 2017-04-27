//Player structure hopefully working for 2-player
class Player
{
	constructor()
	{
		//Pretty riskiy having it global so changing that
		this.dropCounter = 0;
		this.dropInterval = 1000; //In milliseconds. Every 1 second should drop

		this.pos = { x: 0, y: 0 };
  		this.matrix = null;
  		this.score = 0;
	}

	drop() 
	{
		this.pos.y++;
		if (collide(arena, this)) {
		  this.pos.y--;
		  merge(arena, this);
		  playerReset();
		  arenaSweep();
		  updateScore();
	  }

	  // Reseting dropCounter show if we press down another drop wont happened
	  this.dropCounter = 0;
	}

	//Stopping  player from moving off screen
	move(dir) 
	{
		this.pos.x += dir;
		if (collide(arena, this)) {
			this.pos.x -= dir;
	  }
	}

	// Player rotate
	rotate(dir) 
	{
		//reset offset
		const pos = this.pos.x;

		 //init offset varible
		 let offset = 1;
		 rotate(this.matrix, dir);
		 while (collide(arena, this)) {
		   this.pos.x += offset; //this move use to the right or checks if clear
		   offset = -(offset + (offset > 0 ? 1 : -1));

		   // Bail incase it didnt work
		   if (offset > this.matrix[0].length) {
		     rotate(this.matrix, -dir);
		     this.pos.x = pos;
		     return;
	    }
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

