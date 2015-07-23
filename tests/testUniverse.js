describe('Universe', function(){


	it('should init', function(){
		 var uni1 = new Universe(80, 81);

		 expect(uni1.width).toEqual(80);
		 expect(uni1.height).toEqual(81);
		 expect(uni1.grid.length).toEqual(80);
		 expect(uni1.grid[0].length).toEqual(81);


		 var uni2 = new Universe(10, 8);

		 expect(uni2.width).toEqual(10);
		 expect(uni2.height).toEqual(8);
		 expect(uni2.grid.length).toEqual(10);
		 expect(uni2.grid[0].length).toEqual(8);
	});

	it('should calculate next gen state', function(){
		/*
		1 0 1
		0 0 0
		0 1 0 */
		//LF in center should com alive
		var uni1 = new Universe(3, 3);
		uni1.grid[0][0].resuscitate();
		uni1.grid[2][0].resuscitate();
		uni1.grid[1][2].resuscitate();

		uni1.calculateNextGenState();

		expect(uni1.grid[0][0].isAliveNextGen).toBe(true);
		expect(uni1.grid[1][0].isAliveNextGen).toBe(true);
		expect(uni1.grid[2][0].isAliveNextGen).toBe(true);
		expect(uni1.grid[0][1].isAliveNextGen).toBe(true);
		expect(uni1.grid[1][1].isAliveNextGen).toBe(true);
		expect(uni1.grid[2][1].isAliveNextGen).toBe(true);
		expect(uni1.grid[0][2].isAliveNextGen).toBe(true);
		expect(uni1.grid[1][2].isAliveNextGen).toBe(true);
		expect(uni1.grid[2][2].isAliveNextGen).toBe(true);

		/*
		0 0 1 1
		0 0 0 0
		0 0 0 0
		1 0 0 1  */
		//test toroid logic
		var uni2 = new Universe(4, 4);
		uni2.grid[2][0].resuscitate();
		uni2.grid[3][0].resuscitate();
		uni2.grid[0][3].resuscitate();
		uni2.grid[3][3].resuscitate();

		uni2.calculateNextGenState();

		expect(uni2.grid[0][0].isAliveNextGen).toBe(true);
		expect(uni2.grid[1][0].isAliveNextGen).toBe(false);
		expect(uni2.grid[2][0].isAliveNextGen).toBe(true);
		expect(uni2.grid[3][0].isAliveNextGen).toBe(true);
		expect(uni2.grid[0][1].isAliveNextGen).toBe(false);
		expect(uni2.grid[1][1].isAliveNextGen).toBe(false);
		expect(uni2.grid[2][1].isAliveNextGen).toBe(false);
		expect(uni2.grid[3][1].isAliveNextGen).toBe(false);
		expect(uni2.grid[0][2].isAliveNextGen).toBe(false);
		expect(uni2.grid[1][2].isAliveNextGen).toBe(false);
		expect(uni2.grid[2][2].isAliveNextGen).toBe(false);
		expect(uni2.grid[3][2].isAliveNextGen).toBe(false);
		expect(uni2.grid[0][3].isAliveNextGen).toBe(true);
		expect(uni2.grid[1][3].isAliveNextGen).toBe(false);
		expect(uni2.grid[2][3].isAliveNextGen).toBe(true);
		expect(uni2.grid[3][3].isAliveNextGen).toBe(true);
		
		/*
		0 0 0
		0 1 0
		0 0 0 */
		//test loneliness
		var uni3 = new Universe(3, 3);
		uni3.grid[1][1].resuscitate();

		uni3.calculateNextGenState();

		expect(uni3.grid[0][0].isAliveNextGen).toBe(false);
		expect(uni3.grid[1][0].isAliveNextGen).toBe(false);
		expect(uni3.grid[2][0].isAliveNextGen).toBe(false);
		expect(uni3.grid[0][1].isAliveNextGen).toBe(false);
		expect(uni3.grid[1][1].isAliveNextGen).toBe(false);
		expect(uni3.grid[2][1].isAliveNextGen).toBe(false);
		expect(uni3.grid[0][2].isAliveNextGen).toBe(false);
		expect(uni3.grid[1][2].isAliveNextGen).toBe(false);
		expect(uni3.grid[2][2].isAliveNextGen).toBe(false);

		/*
		0 0 0 0 0
		0 1 1 1 0
		0 1 1 1 0
		0 1 1 1 0
		0 0 0 0 0 */
		//test over-crowding
		var uni4 = new Universe(5, 5);
		uni4.grid[1][1].resuscitate();
		uni4.grid[2][1].resuscitate();
		uni4.grid[3][1].resuscitate();
		uni4.grid[1][2].resuscitate();
		uni4.grid[2][2].resuscitate();
		uni4.grid[3][2].resuscitate();
		uni4.grid[1][3].resuscitate();
		uni4.grid[2][3].resuscitate();
		uni4.grid[3][3].resuscitate();

		uni4.calculateNextGenState();

		expect(uni4.grid[0][0].isAliveNextGen).toBe(false);
		expect(uni4.grid[1][0].isAliveNextGen).toBe(false);
		expect(uni4.grid[2][0].isAliveNextGen).toBe(true);
		expect(uni4.grid[3][0].isAliveNextGen).toBe(false);
		expect(uni4.grid[4][0].isAliveNextGen).toBe(false);
		expect(uni4.grid[0][1].isAliveNextGen).toBe(false);
		expect(uni4.grid[1][1].isAliveNextGen).toBe(true);
		expect(uni4.grid[2][1].isAliveNextGen).toBe(false);
		expect(uni4.grid[3][1].isAliveNextGen).toBe(true);
		expect(uni4.grid[4][1].isAliveNextGen).toBe(false);
		expect(uni4.grid[0][2].isAliveNextGen).toBe(true);
		expect(uni4.grid[1][2].isAliveNextGen).toBe(false);
		expect(uni4.grid[2][2].isAliveNextGen).toBe(false);
		expect(uni4.grid[3][2].isAliveNextGen).toBe(false);
		expect(uni4.grid[4][2].isAliveNextGen).toBe(true);
		expect(uni4.grid[0][3].isAliveNextGen).toBe(false);
		expect(uni4.grid[1][3].isAliveNextGen).toBe(true);
		expect(uni4.grid[2][3].isAliveNextGen).toBe(false);
		expect(uni4.grid[3][3].isAliveNextGen).toBe(true);
		expect(uni4.grid[4][3].isAliveNextGen).toBe(false);
		expect(uni4.grid[0][4].isAliveNextGen).toBe(false);
		expect(uni4.grid[1][4].isAliveNextGen).toBe(false);
		expect(uni4.grid[2][4].isAliveNextGen).toBe(true);
		expect(uni4.grid[3][4].isAliveNextGen).toBe(false);
		expect(uni4.grid[4][4].isAliveNextGen).toBe(false);
	});

	it('should calculate actual location', function(){
		var uni = new Universe(4, 4);

		expect(uni.getActualLocation(0, 0)).toEqual({x : 0, y : 0});// top left corner shoule return same
		expect(uni.getActualLocation(1, 3)).toEqual({x : 1, y : 3});
		expect(uni.getActualLocation(-1, 2)).toEqual({x : 3, y : 2});//left side should translate to right side
		expect(uni.getActualLocation(3, 3)).toEqual({x : 3, y : 3});//bottom left corner should return same
		expect(uni.getActualLocation(4, 1)).toEqual({x : 0, y : 1});//right side should translate to  right side
		expect(uni.getActualLocation(2, -1)).toEqual({x : 2, y : 3});//out the top should translate to bottom
		expect(uni.getActualLocation(0, 4)).toEqual({x : 0, y : 0});//out the bottom should translate to top
	});

	it('should calculate living neighbors', function(){
		/*
		0 0 0 0 0
		0 1 1 1 0
		0 1 1 1 0
		0 1 1 1 0
		0 0 0 0 0
		0 0 0 0 0 */
		var uni4 = new Universe(5, 6);
		uni4.grid[1][1].resuscitate();
		uni4.grid[2][1].resuscitate();
		uni4.grid[3][1].resuscitate();
		uni4.grid[1][2].resuscitate();
		uni4.grid[2][2].resuscitate();
		uni4.grid[3][2].resuscitate();
		uni4.grid[1][3].resuscitate();
		uni4.grid[2][3].resuscitate();
		uni4.grid[3][3].resuscitate();

		uni4.countLivingNeighborsAt(0, 0)
		uni4.countLivingNeighborsAt(1, 1)
		uni4.countLivingNeighborsAt(2, 1)
		uni4.countLivingNeighborsAt(3, 2)
		uni4.countLivingNeighborsAt(2, 2)
		uni4.countLivingNeighborsAt(1, 5)
		uni4.countLivingNeighborsAt(3, 4)

		expect(uni4.grid[0][0].numberOfLivingNeighbors).toEqual(1);
		expect(uni4.grid[1][1].numberOfLivingNeighbors).toEqual(3);
		expect(uni4.grid[2][1].numberOfLivingNeighbors).toEqual(5);
		expect(uni4.grid[3][2].numberOfLivingNeighbors).toEqual(5);
		expect(uni4.grid[2][2].numberOfLivingNeighbors).toEqual(8);
		expect(uni4.grid[1][5].numberOfLivingNeighbors).toEqual(0);
		expect(uni4.grid[3][4].numberOfLivingNeighbors).toEqual(2);

	});

	it('evolve should take next gen state and change it to this gen state', function(){
		var uni = new Universe(3, 3);

		uni.grid[1][0].isAliveNextGen = true;
		uni.grid[2][2].isAliveNextGen = true;
		uni.grid[0][2].isAliveNextGen = true;
		uni.grid[0][1].isAliveNextGen = true;

		uni.evolve();

		expect(uni.grid[1][0].isAlive).toBe(true);
		expect(uni.grid[2][2].isAlive).toBe(true);
		expect(uni.grid[0][2].isAlive).toBe(true);
		expect(uni.grid[0][1].isAlive).toBe(true);
	});
});