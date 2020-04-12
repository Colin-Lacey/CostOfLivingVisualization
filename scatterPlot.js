function initializeScatterPlot(){

	//Setting up the axis for each of the indicies at the top 
	var vis = d3.selectAll('#axis');
	var xScale = d3.scaleLinear()
 		.domain([0, 140])
		.range([0, 115]);

	var xAxis = d3.axisBottom(xScale)
		.ticks(3)
		.tickValues(d3.range(0, 141, 70));
		 
	vis.append('g')
		.style("font", "8px Arial")
		.call(xAxis);
	//need to change the placement of the 0, getscut off a bit


	$.subscribe("citySelected", onCitySelected_ScatterPlot);
	$.subscribe("cityDeselected", onCityDeselected_ScatterPlot);
	$.subscribe("citySelectionCleared", onCitySelectionCleared_ScatterPlot);
}

function onCitySelected_ScatterPlot(event, cityData) 
{
	console.log("Scatter plot: City selected:");
	console.log(cityData.City);
	console.log(cityData['Cost of Living Index']);

	var aDiv = document.createElement('div');
	aDiv.id = cityData.City;7
	document.getElementById('plot').appendChild(aDiv);

	//var select = document.getElementById(cityData.City);
	//select.innerHTML += cityData.City;

	var indicies = ['City', 'Cost', 'Rent', 'Groceries', 'Restaurant', 'Local'];

	for (var i = 0; i < indicies.length; i++)
	{
		var anSvg = document.createElement('svg');
		anSvg.id = cityData.City+indicies[i];
		document.getElementById(cityData.City).appendChild(anSvg);
	}
	var select = document.getElementById(cityData.City+"City");
	select.innerHTML += cityData.City;

	//d3 for adding the dots here
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
