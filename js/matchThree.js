var matchThree = (function(){

	var scriptQueue = [];
	var numResourcesLoaded = 0;
	var numResources = 0;
	var executeRunning = false;

	function executeScriptQueue(){
		var next = scriptQueue[0];
		var first, script; 

		if(next && next.loaded){
			executeRunning = true;
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onLoad = function(){
				if(next.callback){
					next.callback();
				}
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		} else {
			executeRunning = false;
		}
	}

	function load(src,callback){
		var image, queueEntry;

		numResources++;

		queueEntry = {
			src : src,
			callback : callback,
			loaded : false
		}

		scriptQueue.push(queueEntry);

		image = new Image();
		image.onLoad = image.onerror = function(){
			numResources++;
			queueEntry.loaded = true;
			if(!executeRunning){
				executeScriptQueue();
			}
		};
		image.src = src;

	}

	function setup(){
		matchThree.showScreen("splash-screen");
		console.log("Success!")
	}

	function showScreen(screenId){
		var dom = matchThree.dom;
		var $ = dom.$;
		var activeScreen = $("#game .screen.active")[0]

		if(activeScreen){
			dom.removeClass(activeScreen, "active");
		}

		matchThree.screens[screenId].run();
	}

	return {
		load : load,
		setup : setup
	};
})();