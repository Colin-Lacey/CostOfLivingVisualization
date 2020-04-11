
function initializeBarChart() {
	$.subscribe("mouseOverCity", onMouseOverCity_BarChart);
	$.subscribe("mouseOutOfCity", onMouseOutOfCity_BarChart);
}

function onMouseOverCity_BarChart(event, cityData) {
	console.log("Bar chart: moused over:");
	console.log(cityData);

	$("#barChart").append("<p>"+cityData.City+"</p>");

	let browsers = [];
	let w = 400;
	let h = 300;
	let barPadding = 0;

	var svg = d3.select("#barContainer").append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("id", "barChart");

	svg.selectAll("rect")
		.data([cityData["Cost of Living Index"], cityData["Rent Index"], cityData["Groceries Index"], cityData["Restaurant Price Index"], cityData["Local Purchasing Power Index"]])
		.enter()
		.append("rect")
		.attr("x", function (d, i) {
			return i * (w / 5);
		})
		.attr("y", function (d) {
			return parseInt(h - d);
		})
		.attr("width", (w / 5) - barPadding)
		.attr("height", function (d) {
			return parseInt(d);
		})
		.attr("fill", function (d, i) {
			var rgbColor = "rgb(" + Math.round((Math.random() * 255)) +
				", " + Math.round((Math.random() * 255)) + ", " +
				Math.round((Math.random() * 255)) + ")";
			return rgbColor;
		});

	// Add a label to each SVG.
	svg.append("text")
	.attr("x", 0)
    .attr("y", 10)
    .attr("dy", ".35em")
    .text(cityData.City);
}


function onMouseOutOfCity_BarChart(event, cityData) {
	console.log("Bar chart: mouse out of:");
	console.log(cityData);

	d3.select("#barChart").remove();

}