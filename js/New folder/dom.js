matchThree.dom = (function(){
	function $(path,parent){
		parent = parent || document;
		return parent.querySelectorAll(path);
	}

	function hasClass(el,clsName){
		var regex = new RegExp("(^|\\s)" + clsName+"(\\s|$)");
		return regex.text(el.className);
	}

	function addClass(el,clsName){
		if(!hasClass(ek,clsName)){
			el.className += " " + clsName;
		}
	}

	function bind(el,event,handler){
		if(typeof el == "string"){
			el = $(el)[0];
		}

		el.addEventListener(event,handler,false);
	}

	function removeClass(el,clsName){
		var regex = new RegExp("(^|\\s)" + clsName+"(\\s|$)");
		el.className = el.className.replace(regex," ");
	}

	return{
		$ : $,
		hasClass : hasClass,
		addClass : addClass,
		removeClass : removeClass,
		bind : bind
	};

})();