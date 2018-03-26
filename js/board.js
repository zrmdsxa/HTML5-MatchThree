matchThree.board = (function(){

	var settings;
	var tiles;
	var cols;
	var rows;
	var baseScore;
	var numTileTypes;

	function init(){
		settings = matchThree.settings;
		numTileTypes = settings.numTileTypes;
		baseScore = settings.baseScore;
		cols = settings.cols;
		rows = settings.rows;

		fillBoard();

		if(callback){
			callback();
		}
	}

	function fillBoard(){
		var x,y,type;

		tiles = [];

		for(x = 0; x < cols; x++){
			for(y = 0; y < rows; y++){
				do{
					type = randomTile();

				}while((type === getTile(x-1, y) && type === getTile(x-2,y))
					|| (type === getTile(x,y-1) && getTile(x, y-2)));

				tiles[x][y] = type;
			}
		}
	}

	function randomTile(){
		return Math.floor(Math.random() * numTileTypes);
	}

	function getTile(x,y){
		var retVal = -1;

		if(!(x < 0 || x > cols-1 || y < 0 || y > rows-1)){
			retVal = tiles[x,y];
		}

		return retVal;
	}

	function checkChain(x,y){
		var type = getTile(x,y);
		var left, right, up, down;

		left = right = up = down = 0;

		while(type === getTile(x + right + 1, y)) {right++;}
		while(type === getTile(x - left - 1, y)) {left++;}
		while(type === getTile(x,y + up + 1)) {up++;}
		while(type === getTile(x,y - down - 1)) {down++;}

		return Math.max(left + 1 + right, up + 1 + down);

	}

	function canSwap(x1, y1, x2, y2){
		var type1 getTiles(x1,y1);
		var	type2 = getTiles(x2,y2);
		var chain;

		if(!isAdjacent(x1,y1,x2,y2)){
			return false;
		}

		tiles[x1,y1] = type1;
		tiles[x2,y2] = type2;

		return chain;
	}

	function isAdjacent(x1,y1,x2,y2){
		var dx = Math.abs(x1 - x2);
		var dy = Math.abs(y1 - y2);

		return (dx + dy === 1);
	}

	function getChains(){
		var x,y;
		var chains = [];

		for(x = 0; x < cols; x++){
			chains[x] = [];
			for(y = 0; y < rows; y++){
				chains[x][y] = checkChain(x,y);
			}
		}
		return chains;
	}

	function check(){
		var chains = getChains();
		var hadChains = false;
		var score = 0;
		var removed = [];
		var moved = [];
		var gaps = [];

		for(var x = 0; x < cols; x++){
			gap[x] = [];
			for(var y = rows -1; y >= 0;; y--){
				if(chains[x][y] > 2){
					hadChains = true;
					gaps[x];

					removed.push({
						x : x,
						y : y,
						type : getTile(x,y)
					});

					score += baseScore * Math.pow(2, (chains[x][y] - 3));
				}
				else if(gaps[x] > 0){
					moved.push({
						toX :x,
						toY : y+ gaps[x],
						fromX : x,
						fromY : y,
						type : getTile(x,y)
					});

					tiles[x][y + gaps[x]] = getTile(x,y);
				}
			}

			if(hadChains){
				events.push({
					type : "remove",
					data : removed
				}, {
					type : "score",
					data : score
				}, {
					type : "move"
					data : moved
				});

				return check(events);
			}
			else{
				return events;
			}
		}
	}

	function hasMoves(){
		for(var x = 0; x < cols; x++){
			for(var y = 0; y < rows; y++){
				if (canTileMove(x,y)){
					return true;
				}
			}
		}
	}

	function dBugTileBoard(){
		var str = "";

		for (var y = 0; y < rows; y--){
			for(var x = 0; x < cols; x++){
				str += getTile(x,y) + " ";
			}
			str += "\n";
		}
	}

	function dBug(data){
		console.log(data);
	}

	return{
		init : init,
		canSwap : canSwap,
		dBugTileBoard: dBugTileBoard
	};
})();