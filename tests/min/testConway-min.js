var  canvas = document.createElement('canvas');
	canvas.id = 'canvas';
	document.body.appendChild(canvas);

	var slider = document.createElement('input');
	slider.id = 'iteration-slider';
	document.body.appendChild(slider);

	var label = document.createElement('label');
	label.id = 'iteration-label';
	document.body.appendChild(label);

	var playPause = document.createElement('input');
	playPause.id = 'play-pause';
	document.body.appendChild(playPause);

describe('Conway', function(){
	

	it('sleepTime getter and setter should work', function(){
		Conway.setSleepTime(300);

		expect(Conway.getSleepTime()).toEqual(300);


		Conway.setSleepTime(15);

		expect(Conway.getSleepTime()).toEqual(15);
		
	});

	it('sleep time should translate from a -1 through 1 scale to a 200 to 5000 ms scale', function(){

		expect(Conway.getTranslatedSleepTime(-1)).toEqual(200);
		expect(Conway.getTranslatedSleepTime(-.75)).toEqual(400);
		expect(Conway.getTranslatedSleepTime(-.5)).toEqual(600);
		expect(Conway.getTranslatedSleepTime(-.25)).toEqual(800);
		
		expect(Conway.getTranslatedSleepTime(0)).toEqual(1000);
		
		expect(Conway.getTranslatedSleepTime(.25)).toEqual(2000);
		expect(Conway.getTranslatedSleepTime(.5)).toEqual(3000);
		expect(Conway.getTranslatedSleepTime(.75)).toEqual(4000);
		expect(Conway.getTranslatedSleepTime(1)).toEqual(5000);
		
	});

	it('should start an stop the game loop', function(){
		Conway.start();
		expect(Conway.isRunning()).toBe(true);

		Conway.stop();
		expect(Conway.isRunning()).toBe(false);
	});

	it('calculates fade values', function(){
		expect(Conway.getFadeValue(10000)).toEqual(.5);
		expect(Conway.getFadeValue(0)).toEqual(0);
		expect(Conway.getFadeValue(5000)).toEqual(.25);
	});
});

