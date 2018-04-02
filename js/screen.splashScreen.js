matchThree.screens["splash-screen"] = (function() {
	var firstRun = true;

	function checkProgress(){
		console.log("checkProgress");
		var $ = matchThree.dom.$;
		var p = matchThree.getLoadProgress() * 100;

		$("#splash-screen .indicator")[0].style.width = p + "%";
		if(p == 100){
			setup();
		}else{
			setTimeout(checkProgress,30);
		}
	}

	function setup(){
		var dom = matchThree.dom;
		var $ = dom.$;
		var screen = $("#splash-screen")[0];

		$(".continue", screen)[0].style.display = "block";

		dom.bind(screen, "click", function(){
			matchThree.showScreen("menu-screen");
		});

		console.log("splash-screen setup");
	}

	

	function run(){
		console.log("run");
		if(firstRun){
			console.log(firstRun);
			checkProgress();
			firstRun = false;
		}
	}

	return {
		run : run
	};

})();