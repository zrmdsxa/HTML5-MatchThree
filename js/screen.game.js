matchThree.screens["game-screen"] = (function(){
	var firstRun = true;
	var paused;

	function startGame(){
		var board = matchThree.board;
		var display = matchThree.display;

		board.init(function(){
			display.init(function(){
				display.redraw(board.getBoard(), function(){

				});
			});
		});

		paused = false;
		var overlay = matchThree.dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "none";
	}

	function pauseGame(){
		if(paused){
			return;
		}
		paused = true;
		var dom = matchThree.dom,
		overlay = dom.$("#game-screen . pause-overlay")[0];
		overlay.style.display = "block";
	}

	function resumeGame(){
		paused = false;
		var dom = matchThree.dom,
		overlay = dom.$("#game-screen .pause-overlay")[0];
		overlay.style.display = "none";
	}

	function exitGame(){
		var confirmed = window.confirm("Do you want to return to menu?");

		if(confirmed){
			matchThree.showScreen("menu-screen");
		}else{
			resumeGame();
		}
	}

	function setup(){
		var dom = matchThree.dom;
		dom.bind("footer button.exit", "click", exitGame);
		dom.bind("footer button.pause", "click", pauseGame);
		dom.bind(".pause-overlay", "click", resumeGame);
	}

	function run(){
		if(firstRun){
			setup();
			firstRun = false;
		}

		startGame();
	}

	return{
		run : run
	};
})();