(function() {
	var currentFocus = -1;
	
	/**
	 * [handleClick : handle click on service items]
	 * @param  {[type]} data [description]
	 * @return {[type]}      [description]
	 */
	function handleClick(data) {
		document.getElementById('input-service').value = data.name;
		// save keyword to local storage
		localStorage.setItem(data.name, data.name);
		var ele = document.getElementById('list-services');
		emptyElement(ele);
	}

	/**
	 * [renderServices : render list service]
	 * @param  {[type]} data [object {id, thumbnailUrl, name}]
	 */
	function renderServices (data) {
		var ele   = document.getElementById('list-services');
		var items = document.createElement("div");  
		items.classList.add("app-items");
		items.onclick = handleClick.bind(this, data);

		// render image service
		var img = document.createElement("img");
		img.src = data.thumbnailUrl;
		img.classList.add("image-services");
		// render name service
		var serviceName = document.createElement("strong");
		var text        = document.createTextNode(data.name);
		serviceName.appendChild(text);

		items.appendChild(img);
		items.appendChild(serviceName);
		ele.appendChild(items); 
	}

	/**
	 * [emptyElement remove element on out click input]
	 * @param  {[type]} ele [element]
	 */
	function emptyElement(ele){
		while(ele.firstChild) {
		  	ele.removeChild(ele.firstChild);
		}
	}

	/**
	 * [renderSugguestList : render list service]
	 * @param  {[type]} allData [array]
	 */
	function renderSugguestList (allData) {
		var ele = document.getElementById('list-services');
		emptyElement(ele);
		allData.map(function(data) {
			renderServices(data);
		});
	}

	/**
	 * [handleFilter : filter service is name]
	 */
	var currentData;
	function handleFilter (render) {
		var key = document.getElementById('input-service').value;
		if (!render && currentData == key) {
			return;
		}
		var dataFilter = TABLE_DATA.filter(function(data) {
		  	return data.name.toLowerCase().indexOf(key.toLowerCase()) > -1;
		});
		currentData = key;
		renderSugguestList(dataFilter);
	}


	/**
	 * [addActive : add class active on keydown]
	 * @param {[type]} x [description]
	 */
	function addActive(x) {
	   	if (!x) {
	   		return false;
	   	}
	   	removeActive(x);
	   	if (currentFocus >= x.length) {
	   		currentFocus = 0;
	   	}
	   	if (currentFocus < 0) {
	   		currentFocus = (x.length - 1);
	   	}
	   	x[currentFocus].classList.add("autocomplete-active");
	}

	/**
	 * [removeActive : remove class active on keydown]
	 * @param  {[type]} x [array list service]
	 */
	function removeActive(x) {
	   	for (var i = 0; i < x.length; i++) {
	     	x[i].classList.remove("autocomplete-active");
	   	}
	}

	// event handle on focus input
	document.getElementById('input-service').addEventListener('focus', function() {
		handleFilter(true);
	});

	// event keyup filter
	document.getElementById('input-service').addEventListener('keyup', function() {
		handleFilter();
	});

	// event keydown filter
	document.getElementById('input-service').addEventListener("keydown", function(e) {
		var ele = document.getElementById("list-services");
		if (ele){
			ele = ele.getElementsByTagName("div");
		}
		if (e.keyCode == 40) {
		    currentFocus++;
		    addActive(ele);
		}
		if (e.keyCode == 38) {
	        currentFocus--;
	        addActive(ele);
	    } 
	    if (e.keyCode == 13) {
	        e.preventDefault();
	        if (currentFocus > -1) {
	        	if (ele) {
	        		ele[currentFocus].click();
	        	}
	        }
	    }
	});

	// add event click out input
	window.onclick = function(e) {
		if(e.target != document.getElementById('input-service')) {
			var ele = document.getElementById('list-services');
			if (!ele) {
				return
			}
			emptyElement(ele);
		}
	}

})();





