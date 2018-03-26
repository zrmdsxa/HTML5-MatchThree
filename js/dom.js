matchThree.dom = (function(){

	function $(path, parent){
		parent = parent || document;
		return parent.querySelectorAll(path);
	}

	function hasClass(el, clsName){
		var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
		return regex.test(el.className);
	}

	function addClass(el, clsName){
		if(!hasClass(el, clsName)){
			el.className += " " + clsName;
		}
	}

	function removeClass(el, clsName){
		var regex = new RegExp("(^|\\s)" + clsName + "(\\s|$)");
		el.className = el.className.replace(regex, " ");
	}

	function bind(el, event, handler){
		//console.log("looking for: " + el.getAttribute("class"));
		if(typeof el == "string"){
			el = $(el)[0];
		}

		el.addEventListener(event, handler, false);
	}

	return {
		$ : $,
		hasClass : hasClass,
		addClass : addClass,
		removeClass : removeClass,
		bind : bind
	};


})();