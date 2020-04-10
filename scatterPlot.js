
function initializeScatterPlot(){
	$.subscribe("citySelected", onCitySelected_ScatterPlot);
	$.subscribe("cityDeselected", onCityDeselected_ScatterPlot);
	$.subscribe("citySelectionCleared", onCitySelectionCleared_ScatterPlot);
}

function onCitySelected_ScatterPlot(cityData){
	console.log("Scatter plot: City selected:");
	console.log(cityData);
}

function onCityDeselected_ScatterPlot(cityData){
	console.log("Scatter plot: City deselected:");
	console.log(cityData);
}

function onCitySelectionCleared_ScatterPlot(){
	console.log("Scatter plot: City selection cleared.");
}