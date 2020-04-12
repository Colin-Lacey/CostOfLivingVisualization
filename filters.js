
function initializeFilters(){
	setInitialFilterValues();
	appendFilter("cost_of_living", "Cost of Living Index");
	appendFilter("rent", "Rent Index");
	appendFilter("groceries", "Groceries Index");
	appendFilter("restaurant_price", "Restaurant Price Index");
	appendFilter("local_purchasing_power", "Local Purchasing Power Index");
}

function setInitialFilterValues(){
	g_filterValues["Cost of Living Index"].min = g_indexStats["Cost of Living Index"].min;
	g_filterValues["Cost of Living Index"].max = g_indexStats["Cost of Living Index"].max;
	g_filterValues["Rent Index"].min = g_indexStats["Rent Index"].min;
	g_filterValues["Rent Index"].max = g_indexStats["Rent Index"].max;
	g_filterValues["Groceries Index"].min = g_indexStats["Groceries Index"].min;
	g_filterValues["Groceries Index"].max = g_indexStats["Groceries Index"].max;
	g_filterValues["Restaurant Price Index"].min = g_indexStats["Restaurant Price Index"].min;
	g_filterValues["Restaurant Price Index"].max = g_indexStats["Restaurant Price Index"].max;
	g_filterValues["Local Purchasing Power Index"].min = g_indexStats["Local Purchasing Power Index"].min;
	g_filterValues["Local Purchasing Power Index"].max = g_indexStats["Local Purchasing Power Index"].max;
}

function appendFilter(filterNameNoSpace, filterName){
	let p = $("#filterContainer").append(
		`<p>Filter ${filterName}</p>
		<div id="${filterNameNoSpace}-container"></div>
	`);

	var sliderRange = d3
		.sliderBottom()
		.min(g_filterValues[filterName].min)
		.max(g_filterValues[filterName].max)
		.width(205)
		.ticks(7)
		.default([g_filterValues[filterName].min, g_filterValues[filterName].max])
		.fill('#2196f3')
		.on('onchange', val => {
			d3.select(`#${filterNameNoSpace}-min-index`).text(Math.trunc(val[0]));
			d3.select(`#${filterNameNoSpace}-max-index`).text(Math.trunc(val[1]));

			g_filterValues[filterName].min = Math.trunc(val[0]);
			g_filterValues[filterName].max = Math.trunc(val[1]);
			$.publish("filtersUpdated");
		});

	var gRange = d3
		.select(`#${filterNameNoSpace}-container`)
		.append('svg')
		.attr('width', 240)
		.attr('height', 70)
		.append('g')
		.attr('transform', 'translate(20,25)');

	gRange.call(sliderRange);

	let sliders = d3.selectAll(`#${filterNameNoSpace}-container .slider .parameter-value`);
	let sliderId = [`${filterNameNoSpace}-min-index`, `${filterNameNoSpace}-max-index`];
	let sliderInitVal = [g_filterValues[filterName].min, g_filterValues[filterName].max];
	sliders.each(function(d, i){
		d3.select(this)
			.append("text")
			.attr("id", ()=> sliderId[i])
			.attr('transform', 'translate(0,-10)')
			.text(() => sliderInitVal[i]);
	});
}