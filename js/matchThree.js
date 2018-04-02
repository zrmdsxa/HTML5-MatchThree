var matchThree = (function(){

	var scriptQueue = [];
	var numResourcesLoaded = 0;
	var numResources = 0;
	var executeRunning = false;

	var settings = {
		rows : 8,
		cols : 8,
		baseScore : 100,
		numTileTypes : 7
	};

	function getLoadProgress(){
		return numResourcesLoaded / numResources;
	}

	function hasWebWorkers(){
		var workers = false;
		workers = ("Worker" in window);
		console.log("workers ="+workers);
		return workers;
	}

	function preload(src){
		var image = new Image();
		image.src = src;
	}

	function executeScriptQueue(){
		var next = scriptQueue[0];
		var first, script;

		if(next && next.loaded){
			executeRunning = true;
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function(){
				if(next.callback){
					next.callback();
				}

				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		}else{
			executeRunning = false;
		}
	}

	function load(src, callback){
		var image, queueEntry;

		numResources++;

		queueEntry = {
			src : src,
			callback : callback, 
			loaded : false
		};

		scriptQueue.push(queueEntry);

		image = new Image();
		image.onload = image.onerror = function(){
			numResourcesLoaded++;
			queueEntry.loaded = true;
			if(!executeRunning){
				executeScriptQueue();
			}
		};
		image.src = src;
	}

	function setup(){
		console.log("setup");
		matchThree.showScreen("splash-screen");
		
	}

	function showScreen(screenId){
		console.log("showScreen "+screenId);
		var dom = matchThree.dom;
		var $ = dom.$;
		var activeScreen = $("#game .screen.active")[0];
		var screen = $("#" + screenId)[0];

		if(activeScreen){
			dom.removeClass(activeScreen, "active");
		}

		dom.addClass(screen, "active");

		matchThree.screens[screenId].run();
	}

	return{
		load: load,
		setup: setup,
		settings: settings,
		getLoadProgress : getLoadProgress,
		hasWebWorkers : hasWebWorkers,
		preload : preload,
		showScreen: showScreen,
		screens: {}
	};


})();