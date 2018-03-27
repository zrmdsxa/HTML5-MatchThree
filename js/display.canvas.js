matchThree.display = (function(){
	var canvas, ctx;
	var firstRun = true;
	var cols, rows;
	var tileSize;
	var tileSprite;
	var tiles;

	function setup(){
		var $ = matchThree.dom.$;
		var settings = matchThree.settings;
		var boardElement = $("#game-screen .game-board")[0];

		cols = settings.cols;
		rows = settings.rows;

		canvas = document.createElement("canvas");
		ctx = canvas.getContext("2d");
		matchThree.dom.addClass(canvas, "board");

		var rect = boardElement.getBoundingClientRect();
		canvas.width = rect.width;
		canvas.height = rect.height;
		tileSize = rect.width / cols;

		boardElement.appendChild(createBackground());
		boardElement.appendChild(canvas);
	}

	function drawTile(type, x, y, scale, rot){
		ctx.save();
		if(typeof scale !== "undefined" && scale > 0){
			ctx.beginPath();
			ctx.translate((x + 0.5) * tileSize, (
							y+ 0.5) * tileSize);
			ctx.scale(scale,scale);
			if(rot){
				ctx.rotate(rot);
			}
			ctx.translate(-(x + 0.5) * tileSize, -(y + 0.5) * tileSize);
		}
		ctx.drawImage(tileSprite, type * tileSize, 0, tileSize, tileSize, x * tileSize, y * tileSize, tileSize, tileSize);
		ctx.restore();
	}

	function redraw(newTiles, callback){
		var x, y;
		tiles = newTiles;
		ctx.clearRect(0,0,canvas.width, canvas.height);
		for(x = 0; x < cols; x++){
			for(y = 0; y < rows; y++){
				drawTile(tiles[x][y], x, y);
			}
		}

		callback();
	}

	function init(callback){
		if(firstRun){
			setup();
			tileSprite = new Image();
			tileSprite.addEventListener("load", callback, false);
			tileSprite.src = "images/jewels" + titleSize + ".png";
			firstRun = false;
		}

		callback();
	}

	function createBackground(){
		var bg = document.createElement("canvas");
		var bgctx = bg.getContext("2d");

		matchThree.dom.addClass(bg, "board-bg");
		bg.width = cols * tileSize;
		bg.height = rows * tileSize;

		bgctx.fillStyle = "rgba(255,255,255,0.15)";

		for(var x = 0; x < cols; x++){
			for (var y = 0 ; y < rows ; y++){
				if ((x+y) % 2){
					bgctx.fillRect(x*tileSize,y * tileSize, tileSize, tileSize);
				}
			}
		}
	}

	return{
		init : init
	};
})();