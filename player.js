//Player structure hopefully working for 2-player
class Player
{
	constructor()
	{
		this.pos = { x: 0, y: 0 };
  		this.matrix = null;
  		this;score = 0;
	}

	//Stopping  player from moving off screen
	move(dir) 
	{
		this.pos.x += dir;
		if (collide(arena, this)) {
			this.pos.x -= dir;
	  }
	}

}

