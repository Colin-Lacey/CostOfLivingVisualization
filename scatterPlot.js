function initializeScatterPlot(){

	let axesSvg = d3.select("#scatterContainer")
		.append("svg")
		.attr("id", "scatterAxesSvg")
		.attr("width", 800)
		.attr("height", 50);
	
	let costOfLivingScale = d3.scaleLinear()
		.domain([g_indexStats["Cost of Living Index"].min, g_indexStats["Cost of Living Index"].max])
		.range([100, 500])
		.nice();

	axesSvg.append("g")
		.attr("transform", "translate(0, 20)")
		.call(d3.axisBottom(costOfLivingScale));


	$.subscribe("citySelected", onCitySelected_ScatterPlot);
	$.subscribe("cityDeselected", onCityDeselected_ScatterPlot);
	$.subscribe("citySelectionCleared", onCitySelectionCleared_ScatterPlot);
}

function onCitySelected_ScatterPlot(event, cityData) 
{
	console.log("Scatter plot: City selected:");
	console.log(cityData);

}

function onCityDeselected_ScatterPlot(event, cityData) 
{
	console.log("Scatter plot: City deselected:");
	console.log(cityData);
}

function onCitySelectionCleared_ScatterPlot(event) 
{
	console.log("Scatter plot: City selection cleared.");
}
