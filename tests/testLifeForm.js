describe('LifeForm', function(){
	var lifeForm0, lifeForm1, lifeForm2, lifeForm3, lifeForm4, lifeForm5, lifeForm6, lifeForm7, lifeForm8;

	beforeEach(function(){
		lifeForm0 = new LifeForm();
		lifeForm1 = new LifeForm();
		lifeForm2 = new LifeForm();
		lifeForm3 = new LifeForm();
		lifeForm4 = new LifeForm();
		lifeForm5 = new LifeForm();
		lifeForm6 = new LifeForm();
		lifeForm7 = new LifeForm();
		lifeForm8 = new LifeForm();

	});

	afterEach(function(){
		lifeForm = null;
	});

	it('should init properly', function(){
		expect(lifeForm0.isAlive).toBe(false);
		expect(lifeForm0.numberOfLivingNeighbors).toEqual(0);
		expect(lifeForm0.isAliveNextGen).toBe(false);
		expect(lifeForm0.timeOfDeath).toEqual(0);
	});

	it('should accumulate living neighbors', function(){
		lifeForm1.addLivingNeighbor();
		
		expect(lifeForm1.numberOfLivingNeighbors).toEqual(1);

		lifeForm2.addLivingNeighbor();
		lifeForm2.addLivingNeighbor();
		
		expect(lifeForm2.numberOfLivingNeighbors).toEqual(2);		

		lifeForm3.addLivingNeighbor();
		lifeForm3.addLivingNeighbor();
		lifeForm3.addLivingNeighbor();

		expect(lifeForm3.numberOfLivingNeighbors).toEqual(3);

		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();

		expect(lifeForm4.numberOfLivingNeighbors).toEqual(4);

		lifeForm5.addLivingNeighbor();
		lifeForm5.addLivingNeighbor();
		lifeForm5.addLivingNeighbor();
		lifeForm5.addLivingNeighbor();
		lifeForm5.addLivingNeighbor();

		expect(lifeForm5.numberOfLivingNeighbors).toEqual(5);

		lifeForm6.addLivingNeighbor();
		lifeForm6.addLivingNeighbor();
		lifeForm6.addLivingNeighbor();
		lifeForm6.addLivingNeighbor();
		lifeForm6.addLivingNeighbor();
		lifeForm6.addLivingNeighbor();

		expect(lifeForm6.numberOfLivingNeighbors).toEqual(6);

		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();

		expect(lifeForm7.numberOfLivingNeighbors).toEqual(7);

		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();
		lifeForm8.addLivingNeighbor();

		expect(lifeForm8.numberOfLivingNeighbors).toEqual(8);
	});

	it('should resuscitate', function(){
		lifeForm1.resuscitate();
		expect(lifeForm1.isAlive).toBe(true);
	});

	it('should die when killed', function(){
		lifeForm1.resuscitate();
		lifeForm1.kill();

		expect(lifeForm1.isAlive).toBe(false);
	});

	it('should evolve to next gen state', function(){
		lifeForm1.isAliveNextGen = true;
		lifeForm1.evolve();
		expect(lifeForm1.isAlive).toBe(true);

		lifeForm1.isAliveNextGen = false;
		lifeForm1.evolve();
		expect(lifeForm1.isAlive).toBe(false);
	});

	it('neighbor count should reset', function(){
		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();
		lifeForm4.addLivingNeighbor();
		
		lifeForm4.resetNeighborCount();

		expect(lifeForm4.numberOfLivingNeighbors).toEqual(0);

		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		lifeForm7.addLivingNeighbor();
		
		lifeForm7.resetNeighborCount();

		expect(lifeForm7.numberOfLivingNeighbors).toEqual(0);
	});

	it('should follow rules of the game', function(){
		//test all state logic for a dead LifeForm

		//0 living neighbors (dead LF)
		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//1 living neighbor (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//2 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//3 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(true);

		//4 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//5 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//6 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//7 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//8 living neighbors (dead LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);


		//test all state logic for a living LifeForm
		lifeForm0.resetNeighborCount();
		lifeForm0.resuscitate();

		//0 living neighbors (living LF)
		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//1 living neighbor (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//2 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(true);

		//3 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(true);

		//4 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//5 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//6 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//7 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);

		//8 living neighbors (living LF)
		lifeForm0.addLivingNeighbor();

		lifeForm0.calculateStateNextGen();
		expect(lifeForm0.isAliveNextGen).toBe(false);
	});
});