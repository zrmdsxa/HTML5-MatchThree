matchThree.screens["screen-game"] = (function(){
	var firstRun = true;
	var paused;
	var pauseState;
	var cursor;
	var gameState = { };

	function startGame() {
		var board = matchThree.board;
		var display = matchThree.display;
		gameState = {
			level : 0,
			score : 0,
			timer : 0, //setTimeout reference
			startTime : 0, // time at start of level
			endTime : 0 //time to gameover
		};
		updateGameInfo();

		board.init(function(){
			display.init(function(){
				cursor = {
					x : 0,
					y : 0,
					selected : false
				};
				display.redraw(board.getBoard(),function(){
					advanceLevel()
				});
			});
		});
		paused = false;
		var overlay = matchThree.dom.$("screen-game .pause-overlay")[0];
		overlay.style.display = "none"
	}
})();