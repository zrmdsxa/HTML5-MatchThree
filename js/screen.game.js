matchThree.screens["game-screen"] = (function(){
	var firstRun = true;

	function startGame(){
		var board = matchThree.board;
		var display = matchThree.display;

		board.init(function(){
			display.init(function(){
				display.redraw(board.getBoard(), function(){
					
				});
			});
		});
	}

	function setup(){

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