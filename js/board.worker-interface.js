matchThree.board = (function(){
	var  settings, worker, messageCount, callbacks;
	var dom = matchThree.dom;

	function post(command, data, callback){
		callbacks[messageCount] = callback;
		worker.postMessage({
			id : messageCount,
			command : command,
			data : data
		});
		messageCount++;
	}

	function messageHandler(event){
		var message = event.data;
		tiles = message.tiles;

		if(callbacks[message.id]){
			callbacks[message.id](message.data);
			delete callbacks[message.id];
		}
	}

	function init(callback){
		settings = matchThree.settings;
		rows = settings.rows;
		cols = settings.cols;
		messageCount = 0;
		callbacks = [];
		worker = new Worker("js/board.worker.js");
		dom.bind(worker, "message", messageHandler);
		post("init", matchThree.settings, callback);
	}

	function swap(x1,y1,x2,y2,callback){
		post("swap",{
			x1 : x1,
			y1 : y1,
			x2 : x2,
			y2 : y2
		},callback)
	}

	function getBoard(){
		var copy = [];
		var x;

		for(x = 0; x < cols; x++){
			copy[x] = tiles[x].slice(0);
		}

		return copy;
	}

	function getTile(x,y){
		var retVal = -1;
		if (!(x < 0 || x > cols-1 || y < 0 || y > rows-1)){
			retVal = tiles[x][y];
		}
		return retVal;
	}

	return {
		init : init,
		swap : swap,
		getBoard : getBoard
	};
})();