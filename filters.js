
function initializeFilters(){
	appendFilter("cost_of_living", "Cost of Living Index", "cost_of_living_filter_container");
	appendFilter("rent", "Rent Index", "rent_filter_container");
	appendFilter("groceries", "Groceries Index", "groceries_filter_container");
	appendFilter("restaurant_price", "Restaurant Price Index", "restaurant_price_filter_container");
	appendFilter("local_purchasing_power", "Local Purchasing Power Index", "local_purchasing_power_filter_container");
}

function appendFilter(htmlIdPart, filterName, divId){
	let p = $("#filterContainer").append(
		`<p>Filter ${filterName}</p>
		<div id="${divId}"></div>
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
			d3.select(`#${htmlIdPart}-min-index`).text(Math.trunc(val[0]));
			d3.select(`#${htmlIdPart}-max-index`).text(Math.trunc(val[1]));

			g_filterValues[filterName].min = Math.trunc(val[0]);
			g_filterValues[filterName].max = Math.trunc(val[1]);
			$.publish("filtersUpdated");
		});

	var gRange = d3
		.select(`#${divId}`)
		.append('svg')
		.attr('width', 240)
		.attr('height', 70)
		.append('g')
		.attr('transform', 'translate(20,25)');

	gRange.call(sliderRange);

	let sliders = d3.selectAll(`#${divId} .slider .parameter-value`);
	let sliderId = [`${htmlIdPart}-min-index`, `${htmlIdPart}-max-index`];
	let sliderInitVal = [g_filterValues[filterName].min, g_filterValues[filterName].max];
	sliders.each(function(d, i){
		d3.select(this)
			.append("text")
			.attr("id", ()=> sliderId[i])
			.attr('transform', 'translate(0,-10)')
			.text(() => sliderInitVal[i]);
	});
}