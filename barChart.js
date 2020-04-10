
function initializeBarChart(){
	$.subscribe("mouseOverCity", onMouseOverCity_BarChart);
	$.subscribe("mouseOutOfCity", onMouseOutOfCity_BarChart);
}

function onMouseOverCity_BarChart(event, cityData){
	console.log("Bar chart: moused over:");
	console.log(cityData);
}

function onMouseOutOfCity_BarChart(event, cityData){
	console.log("Bar chart: mouse out of:");
	console.log(cityData);
}