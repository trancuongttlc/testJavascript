function handleClick(data) {
	document.getElementById('input-service').value = data.name;
	// save keyword to local storage
	localStorage.setItem(data.name, data.name);
	var ele = document.getElementById('list-services');
	while(ele.firstChild) {
	  	ele.removeChild(ele.firstChild);
	}
}

/**
 * [renderServices : render list service]
 * @param  {[type]} data [object {id, thumbnailUrl, name}]
 */
function renderServices(data) {

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


function emptyElement(ele){
	while(ele.firstChild) {
	  	ele.removeChild(ele.firstChild);
	}
}

function renderSugguestList(allData) {
	var ele = document.getElementById('list-services');
	// emptyElement(ele);
	allData.map(function(data) {
		renderServices(data);
	});
}

var currentFocus = -1;
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

function removeActive(x) {
   	for (var i = 0; i < x.length; i++) {
     	x[i].classList.remove("autocomplete-active");
   	}
}

/**
 * [handleFilter : filter service is name]
 */
function handleFilter () {
	var key = document.getElementById('input-service').value;
	var dataFilter = TABLE_DATA.filter(function(data) {
	  	return data.name.toLowerCase().indexOf(key.toLowerCase()) > -1;
	});
	renderSugguestList(dataFilter);
}