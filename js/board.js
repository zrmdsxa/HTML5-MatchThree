matchThree.board = (function(){

	var settings;
	var tiles;
	var cols;
	var rows;
	var baseScore;
	var numTileTypes;

	function init(callback){
		console.log("init");
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
		console.log("fillboard");
		var x,y,type;

		tiles = [];

		for(x = 0; x < cols; x++){

			tiles[x] = [];
			for(y = 0; y < rows; y++){
				//console.log(y);
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
		var type1 = getTile(x1,y1);
		var	type2 = getTile(x2,y2);
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

	function check(events){
		var chains = getChains();
		var hadChains = false;
		var score = 0;
		var removed = [];
		var moved = [];
		var gaps = [];

		for(var x = 0; x < cols; x++){
			gap[x] = [];
			for(var y = rows -1; y >= 0; y--){
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
					type : "move",
					data : moved
				});

				if(!hasMoves()){
					fillBoard();
					events.push({
						type : "refill",
						data : getBoard()
					});
				}
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
		return false;
	}

	function canTileMove(x,y){
		return ((x > 0 && canSwap(x,y,x-1,y)) || 
				(x <  cols-1 && canSwap(x,y,x+1,y)) ||
				(y > 0 && canSwap(x,y,x,y-1)) ||
				(y < rows-1 && canSwap(x,y,x,y+1)));
	}

	function getBoard(){
		console.log("getboard");
		var copy = [] , x;

		for(x = 0; x < cols; x++){
			copy[x] = tiles[x].slice(0);
		}

		return copy;
	}

	function swap(x1,y1,x2,y2, callback){
		var tmp, swap1, swap2;
		var events = [];

		swap1 = {
			type : "move",
			data : [{
				type : getTile(x1, y1),
				fromX : x1, fromY : y1, toX : x2, toY : y2
			},{
				type : getTile(x1, y1),
				fromX : x2, fromY : y2, toX : x1, toY : y1
			}]
		}

		if(isAdjacent(x1,y1,x2,y2)){
			events.push(swap1);

			if(canSwap(x1,y1,x2,y2)){
				tmp = getTile(x1,y1);
				tiles[x1][y1] = getTile(x2,y2);
				tiles[x2][y2] = tmp;
				events = events.concat(check());
			}else{
				events.push(swap2,{type : " badswap"});
			}
			callback(events);
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
		swap : swap,
		canSwap : canSwap,
		getBoard : getBoard,
		dBugTileBoard: dBugTileBoard
	};
})();