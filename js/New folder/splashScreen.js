matchThree.screens["splash-screen"] = (function() {
	var firstRun = true;

	

	function setup(){
		var dom = matchThree.dom;
		var $ = dom.$;
		var screen = $("#splash-screen")[0];

		$(".continue", screen)[0].style.display = "block";

		dom.bind(screen,"click", function(){
			matchThree.showScreen("main-screen");
			console.log("click");
		});
	}

	function run(){
		if(firstRun){
			setup();
			firstRun = false;
		}
	}

	return {
		run : run
	};

})();