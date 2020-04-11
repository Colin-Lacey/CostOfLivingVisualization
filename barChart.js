
function initializeBarChart() {
	$.subscribe("mouseOverCity", onMouseOverCity_BarChart);
	$.subscribe("mouseOutOfCity", onMouseOutOfCity_BarChart);
}

function onMouseOverCity_BarChart(event, cityData) {
	console.log("Bar chart: moused over:");
	console.log(cityData);

	$("#cityName").html("<b>"+cityData.City+"</b>");

	// following code modified from https://bl.ocks.org/alex-rind/0db75664782bd4ecdcbc93787ed07597

	var svg = d3.select("#barchart"),
		margin = { top: 20, right: 20, bottom: 30, left: 40 },
		width = +400 - margin.left - margin.right,
		height = +280 - margin.top - margin.bottom;

	//width = +svg.attr("width") - margin.left - margin.right,
	//height = +svg.attr("height") - margin.top - margin.bottom;

	var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
		y = d3.scaleLinear().rangeRound([height, 0]);

	var g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	const data = [
		{ "Index": "COL", "Value": cityData["Cost of Living Index"] },
		{ "Index": "Groceries", "Value": cityData["Groceries Index"] },
		{ "Index": "Restaurants", "Value": cityData["Restaurant Price Index"] },
		{ "Index": "Rent", "Value": cityData["Rent Index"] },
		{ "Index": "Purchasing Power", "Value": cityData["Local Purchasing Power Index"] }
	]


	x.domain(data.map(function (d) { return d.Index; }));
	y.domain([0, 140]);

	g.append("g")
		.attr("class", "axis axis--x")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x));

	g.append("g")
		.attr("class", "axis axis--y")
		.call(d3.axisLeft(y))
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", "0.71em")
		.attr("text-anchor", "end")
		.text("Frequency");

	g.selectAll(".bar")
		.data(data)
		.enter().append("rect")
		.attr("class", "bar")
		.attr("x", function (d) { return x(d.Index); })
		.attr("y", function (d) { return y(parseInt(d.Value)); })
		.attr("width", x.bandwidth())
		.attr("height", function (d) { return height - y(parseInt(d.Value)); })
		.attr("fill", function(d) {
			switch(d.Index) {
				case "COL": return "#400000";
				case "Groceries": return"#7c0010";
				case "Restaurants": return"#bd0011";
				case "Rent": return "#ff1600";
				case "Purchasing Power": return "#000080";
			}
		});
}




function onMouseOutOfCity_BarChart(event, cityData) {
	console.log("Bar chart: mouse out of:");
	console.log(cityData);

	d3.select("#barchart").selectAll('g').remove();

}