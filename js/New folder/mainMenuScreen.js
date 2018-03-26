matchThree.screens["menu-screen"] = (function() {
	var firstRun = true;

	function setup(){
		matchThree.dom.bind("#menu-screen ul.menu", "click", function(e){
			if(e.target.nodeName.toLowerCase() == "button"){
				var action = e.target.getAttribute("name");
				matchThree.showScreen(action);
			}
		});
	}

	function run(){
		if(firstRun){
			setup();
			firstRun = false;

		}
	}

	

	return{
		run : run
	};
})();