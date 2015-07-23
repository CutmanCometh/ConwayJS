function Universe(width, height){
	this.width = width;
	this.height = height;

	this.grid = [];
	for(var w = 0; w < width; w++){
		this.grid[w] = [];
		for(var h = 0; h < height; h++){
			this.grid[w][h] = new LifeForm();
		}
	}
}


Universe.prototype.getActualLocation = function(x, y){
	//this method is necessary because we are dealing with a toroid universe
	//if a LifeForm exists on the top row, for example, when we check "above" it, we actually need to check the bottom row
	var newX = x;
	var newY = y;

	if(newX < 0) newX = this.width - 1;
	else if(newX >= this.width) newX = 0;

	if(newY < 0) newY = this.width - 1;
	else if(newY >= this.width) newY = 0;

	return{
		//x : (x >= 0 && < this.width) ? x : ((x == -1) this.width - 1);
		x : newX,
		y : newY
	};
};

Universe.prototype.countLivingNeighborsAt = function(x, y){
	this.grid[x][y].resetNeighborCount();
	var actualLocation = null;
	//check top left
	actualLocation = this.getActualLocation(x-1, y-1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check top
	actualLocation = this.getActualLocation(x, y-1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check top right
	actualLocation = this.getActualLocation(x+1, y-1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check left
	actualLocation = this.getActualLocation(x-1, y);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check right
	actualLocation = this.getActualLocation(x+1, y);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check bottom left
	actualLocation = this.getActualLocation(x-1, y+1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check bottom
	actualLocation = this.getActualLocation(x, y+1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	//check bottom right
	actualLocation = this.getActualLocation(x+1, y+1);
	if(this.grid[actualLocation.x][actualLocation.y].isAlive) this.grid[x][y].addLivingNeighbor();

	
};

Universe.prototype.calculateNextGenState = function(){
	for(var x = 0; x < this.width; x++){
		for(var y = 0; y < this.height; y++){
			var livingNeighbors = this.countLivingNeighborsAt(x, y);
			this.grid[x][y].calculateStateNextGen();
		}
	}
};

Universe.prototype.evolve = function(){
	for(var x = 0; x < this.width; x++){
		for(var y = 0; y < this.height; y++){
			this.grid[x][y].evolve();
		}
	}
};