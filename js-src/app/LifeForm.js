function LifeForm(){
	this.isAlive = false;
	this.isAliveNextGen = false;
	this.numberOfLivingNeighbors = 0;
	this.timeOfDeath = 0;

}

LifeForm.prototype.kill = function(){
	if(this.isAlive & !(this.isAlive = false))
		this.timeOfDeath = Date.now();//TODO refactor LifeForm.kill() and LifeForm.evolve() to eliminate nearly identical code
};

LifeForm.prototype.resuscitate = function(){
	this.isAlive = true;
};

LifeForm.prototype.addLivingNeighbor = function(){
	this.numberOfLivingNeighbors ++;
};

LifeForm.prototype.evolve = function(){
	if(this.isAlive & !(this.isAlive = this.isAliveNextGen)){//NOT accidental assignment! using the return value of the assignment to decide ifornot to assign a new kill time
		this.timeOfDeath = Date.now();
	}
};

LifeForm.prototype.resetNeighborCount = function(){
	this.numberOfLivingNeighbors = 0;
};

LifeForm.prototype.calculateStateNextGen = function(){
	if(this.numberOfLivingNeighbors < 2 || this.numberOfLivingNeighbors > 3){
		//definitely dead
		this.isAliveNextGen = false;
	}
	else{
		//we know it has either 2 or 3 living neighbors
		if(this.numberOfLivingNeighbors === 3){
			//definitely alive
			this.isAliveNextGen = true;
		}
		else{
			//has exactly 2 living neighbors
			//alive with 2 living neighbors stays alive
			//dead with 2 living neighbors stays dead
			this.isAliveNextGen = this.isAlive;
		}
	}
};