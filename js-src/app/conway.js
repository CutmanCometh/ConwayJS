var Conway = (function(){
	var sleepTime = 1000;
	var timeoutHandle = null;
	var universe = new Universe(80, 80);

	var canvas, context, sleepTimeSlider, sleepTimeLabel, playPauseButton;

	var HEIGHT = 800;
	var WIDTH = 800;
	var CELLS_WIDE = 80;
	var CELLS_TALL = 80;

	var drawUniverse = function(){
		context.fillStyle = "white";
		context.fillRect(0, 0, WIDTH, HEIGHT);


		
		//draw each living LF
		var drawTime = Date.now();
		for(var x = 0; x < CELLS_WIDE; x++){
			for(var y = 0; y < CELLS_TALL; y++){
				var lifeForm = universe.grid[x][y];
				if(lifeForm.isAlive){
					context.fillStyle = "black";
					context.fillRect(x * 10, y * 10, 10, 10);
				}
				else{
					var timeDead = drawTime - lifeForm.timeOfDeath;
					if(timeDead < 5000){
						var darkness = getFadeValue(timeDead);
						
						context.fillStyle = "rgba(0,0,0," + darkness + ")";
						context.fillRect(x * 10, y * 10, 10, 10);
					}
				}
			}
		}
	};

	var getFadeValue = function(timeDead){
		//10000 corresponds to 0
		//0 corresponds to .5
		return .2 - (timeDead * .00004);
	};

	var repaint = function(){
		drawUniverse();
		window.requestAnimationFrame(repaint);
	};

	var init = function(){
		

		canvas = document.getElementById("canvas");
		context = canvas.getContext('2d');
		iterationSlider = document.getElementById("iteration-slider");
		iterationLabel = document.getElementById("iteration-label");
		playPauseButton = document.getElementById('play-pause');


		//glider for testing purposes
		/*
		0 1 0
		0 0 1
		1 1 1*/
		/*universe.grid[1][0].resuscitate();
		universe.grid[2][1].resuscitate();
		universe.grid[0][2].resuscitate();
		universe.grid[1][2].resuscitate();
		universe.grid[2][2].resuscitate();*/

		
		//attach events
		playPauseButton.onclick = playPauseHandler;
		iterationSlider.onchange = iterationSliderChangeHandler;
		canvas.onclick = canvasMouseClickHandler;
		canvas.onmousedown = canvasMouseDownHandler;
		canvas.onmouseup = canvasMouseUpHandler;
		canvas.onmouseleave = canvasMouseUpHandler;

		repaint();
	};

	var resuscitateLifeFormAt = function(x, y){
		universe.grid[x][y].resuscitate();
	};

	var killLifeFormAt = function(x, y){
		universe.grid[x][y].kill();
	};

	var getGridIndicesFromClickLocation = function(clickX, clickY){
		return {x : Math.floor(clickX / 10), y : Math.floor(clickY / 10)};
	};

	var canvasMouseClickHandler = function(evt){
		var gridLocation = getGridIndicesFromClickLocation(evt.offsetX, evt.offsetY);

		if(evt.altKey) killLifeFormAt(gridLocation.x, gridLocation.y);
		else resuscitateLifeFormAt(gridLocation.x, gridLocation.y);
	};

	var canvasMouseMoveHandler = function(evt){
		var gridLocation = getGridIndicesFromClickLocation(evt.offsetX, evt.offsetY);

		if(evt.altKey) killLifeFormAt(gridLocation.x, gridLocation.y);
		else resuscitateLifeFormAt(gridLocation.x, gridLocation.y);
	};

	var canvasMouseDownHandler = function(evt){
		canvas.addEventListener('mousemove', canvasMouseMoveHandler);
	};

	var canvasMouseUpHandler = function(evt){
		canvas.removeEventListener('mousemove', canvasMouseMoveHandler);
	};

	var iterationSliderChangeHandler = function(evt){
		var newIterationSleepTime = Number(iterationSlider.value);
		newIterationSleepTime = getTranslatedSleepTime(newIterationSleepTime);
		
		var cacheIsRunning = isRunning();

		stop();
		sleepTime = newIterationSleepTime;
		if(cacheIsRunning) start();
		changeIterationSliderLabel();
	};

	var changeIterationSliderLabel = function(){
		iterationLabel.textContent = "Evolve every " + (sleepTime / 1000) + " seconds";
	};

	var playPauseHandler = function(evt){
		if(isRunning()){
			Conway.stop();
			playPauseButton.value = "Play";
		}
		else{
			Conway.start();
			playPauseButton.value = "Pause";
		}
	};

	var gameLoop = function(){
		//capture start time
		var startTime = Date.now();

		//calculate next gen state
		universe.calculateNextGenState();

		//evolve
		universe.evolve();

		//paint the canvas
		drawUniverse();

		//sleep for sleepTime minus the time it took to calculate and paint
		timeoutHandle = setTimeout(gameLoop, sleepTime - (Date.now() - startTime));
	};

	var start = function(){
		gameLoop();
	};

	var stop = function(){
		clearTimeout(timeoutHandle);
		timeoutHandle = null;
	};

	var isRunning = function(){
		return !!timeoutHandle;
	};

	var getTranslatedSleepTime = function(sleepTimeInput){
		if(sleepTimeInput >= 0) return ((sleepTimeInput * 4) * 1000) + 1000;
		else{
			//must be less than zero
			return ((sleepTimeInput + 1) * 800) + 200;
		}
	};

	var getSleepTime = function(){
		return sleepTime;
	};

	var setSleepTime = function(newSleepTime){
		sleepTime = newSleepTime;
	};

	return {
		getSleepTime 			: getSleepTime,
		setSleepTime 			: setSleepTime,
		getTranslatedSleepTime 	: getTranslatedSleepTime,
		start 					: start,
		stop					: stop,
		isRunning				: isRunning,
		init					: init,
		getFadeValue			: getFadeValue,
		getGridIndicesFromClickLocation : getGridIndicesFromClickLocation
	};
})();

window.onload = function(){
	Conway.init();
};