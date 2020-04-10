
function initializeScatterPlot(){
	$.subscribe("citySelected", onCitySelected_ScatterPlot);
	$.subscribe("cityDeselected", onCityDeselected_ScatterPlot);
	$.subscribe("citySelectionCleared", onCitySelectionCleared_ScatterPlot);
}

function onCitySelected_ScatterPlot(event, cityData){
	console.log("Scatter plot: City selected:");
	console.log(cityData);
}

function onCityDeselected_ScatterPlot(event, cityData){
	console.log("Scatter plot: City deselected:");
	console.log(cityData);
}

function onCitySelectionCleared_ScatterPlot(event){
	console.log("Scatter plot: City selection cleared.");
}