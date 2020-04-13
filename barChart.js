
let g, x, y, height, data;

function initializeBarChart() {
	$.subscribe("mouseOverCity", onMouseOverCity_BarChart);
	$.subscribe("mouseOutOfCity", onMouseOutOfCity_BarChart);

	// following code modified from https://bl.ocks.org/alex-rind/0db75664782bd4ecdcbc93787ed07597

	$("#cityName").html("<b>&nbsp</b>");

	let svg = d3.select("#barchart");
	let margin = { top: 20, right: 20, bottom: 30, left: 40 };
	let width = +400 - margin.left - margin.right;
	height = +280 - margin.top - margin.bottom;

	//width = +svg.attr("width") - margin.left - margin.right,
	//height = +svg.attr("height") - margin.top - margin.bottom;

	x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
	y = d3.scaleLinear().rangeRound([height, 0]);

	g = svg.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	x.domain(["Cost Living","Rent","Groceries","Restaurants","Purchasing Pwr"]);
	y.domain([0, 160]);

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
	
	onMouseOutOfCity_BarChart();
}

function onMouseOverCity_BarChart(event, cityData) {
	$("#cityName").html("<b>"+cityData.City+"</b>");

	data = [
		{ "Index": "Cost Living", "Value": cityData["Cost of Living Index"] },
		{ "Index": "Rent", "Value": cityData["Rent Index"] },
		{ "Index": "Groceries", "Value": cityData["Groceries Index"] },
		{ "Index": "Restaurants", "Value": cityData["Restaurant Price Index"] },
		{ "Index": "Purchasing Pwr", "Value": cityData["Local Purchasing Power Index"] }
	];

	updateBarsWithNewData();
		
}

function onMouseOutOfCity_BarChart(event, cityData) {
	$("#cityName").html("<b>&nbsp</b>");

	data = [
		{ "Index": "Cost Living", "Value": 0 },
		{ "Index": "Rent", "Value": 0 },
		{ "Index": "Groceries", "Value": 0 },
		{ "Index": "Restaurants", "Value": 0 },
		{ "Index": "Purchasing Pwr", "Value": 0 }
	];

	updateBarsWithNewData();
}

function updateBarsWithNewData(){
	let rects = g.selectAll(".bar")
		.data(data);
	
	let labels = g.selectAll(".bar_label")
		.data(data);
	
	let enterRects = rects.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function (d) { return x(d.Index); })
		.attr("width", x.bandwidth())
		.attr("fill", function(d) {
			switch(d.Index) {
				case "Cost Living": return getComputedStyle(g_root).getPropertyValue('--cost-living-color');
				case "Rent": return getComputedStyle(g_root).getPropertyValue('--rent-color');
				case "Groceries": return getComputedStyle(g_root).getPropertyValue('--groceries-color');
				case "Restaurants": return getComputedStyle(g_root).getPropertyValue('--restaurants-color');
				case "Purchasing Pwr": return getComputedStyle(g_root).getPropertyValue('--purchasing-pwr-color');
			}
		});
	
	let enterLabels = labels.enter()
		.append("text")
		.attr("class", "bar_label")
		.style("text-anchor", "middle")
		.attr("x", function (d) { return x(d.Index) + x.bandwidth()/2; });

	rects.merge(enterRects)
		.transition()
		.duration(500)
		.attr("y", function (d) { return y(parseInt(d.Value)); })
		.attr("height", function (d) { return height - y(parseInt(d.Value)); });
	
	labels.merge(enterLabels)
		.text(function (d) { 
			return d.Value=="0" ? "" : d.Value; 
		})
		.transition()
		.duration(500)
		.attr("y", function (d) { return y(parseInt(d.Value)); })
		.attr("dy", -5);
}