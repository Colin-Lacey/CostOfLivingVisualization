
let scatterIndexInfo = [
	{
		name: "Cost of Living Index",
		shortName: "Cost. Living",
		color: "yellow"
	},
	{
		name: "Rent Index",
		shortName: "Rent",
		color: "red"
	},
	{
		name: "Groceries Index",
		shortName: "Groceries",
		color: "blue"
	},
	{
		name: "Restaurant Price Index",
		shortName: "Restaurant",
		color: "green"
	},
	{
		name: "Local Purchasing Power Index",
		shortName: "Purch. Power",
		color: "purple"
	},
];

let bandScale;
let svgWidth = 790;

function initializeScatterPlot(){

	bandScale = d3.scaleBand()
		.domain([ "City",
			"Cost of Living Index",
			"Rent Index",
			"Groceries Index",
			"Restaurant Price Index",
			"Local Purchasing Power Index"
		])
		.range([0, svgWidth])
		.paddingInner(0.15)
		.paddingOuter(0.1);
	
	setUpAxes();

	$.subscribe("citySelected", onCitySelected_ScatterPlot);
	$.subscribe("cityDeselected", onCityDeselected_ScatterPlot);
	$.subscribe("citySelectionCleared", onCitySelectionCleared_ScatterPlot);
}

function setUpAxes(){
	let axesSvg = d3.select("#scatterContainer")
		.append("svg")
		.attr("id", "scatterAxesSvg")
		.attr("width", svgWidth)
		.attr("height", 45);

	scatterIndexInfo.forEach( (index) => {
		index.scale = d3.scaleLinear()
			.domain([g_indexStats[index.name].min, g_indexStats[index.name].max])
			.range([bandScale(index.name), bandScale(index.name)+bandScale.bandwidth()])
			.nice();

		index.axis = d3.axisBottom(index.scale)
			.ticks(3);

		let range = index.scale.range();
		let middleX = (range[0] + range[1])/2;

		axesSvg.append("g")
			.attr("transform", "translate(0, 25)")
			.call(index.axis)
			.append("text")
			.attr("x", middleX)
			.attr("dy", -8)
			.attr("fill", "black")
			.style("text-anchor", "middle")
			.text(index.shortName);
	});
}

function onCitySelected_ScatterPlot(event, cityData) 
{
	console.log("Scatter plot: City selected:");
	console.log(cityData);

	let svg = d3.select("#scatterContainer")
		.append("svg")
		.attr("id", `scatterRow${cityData.Rank}`)
		.attr("class", "scatterCityRow")
		.attr("width", svgWidth)
		.attr("height", 20);

	svg.append("text")
		.style("text-anchor", "end")
		.attr("x", bandScale("City")+bandScale.bandwidth())
		.attr("y", 15)
		.attr("fill", "black")
		.text(cityData.City);
	
	scatterIndexInfo.forEach(function (index) {
		svg.append("circle")
			.attr("r", 5)
			.attr("fill", index.color)
			.attr("cx", index.scale(cityData[index.name]))
			.attr("cy", 10);
	});
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
