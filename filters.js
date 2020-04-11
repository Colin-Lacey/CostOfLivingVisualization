
function initializeFilters(){
	$("#filterContainer").append("p").text("Filter Cost Of Living Index");
	$("#filterContainer").append(`<div id="cost-of-living-filter-container"></div>`);

	var sliderRange = d3
		.sliderBottom()
		.min(g_filterValues.cost_of_living.min)
		.max(g_filterValues.cost_of_living.max)
		.width(205)
		.ticks(7)
		.default([g_filterValues.cost_of_living.min, g_filterValues.cost_of_living.max])
		.fill('#2196f3')
		.on('onchange', val => {
			d3.select("#min-index").text(Math.trunc(val[0]));
			d3.select("#max-index").text(Math.trunc(val[1]));

			g_filterValues.cost_of_living.min = Math.trunc(val[0]);
			g_filterValues.cost_of_living.max = Math.trunc(val[1]);
			$.publish("filtersUpdated");
		});

	var gRange = d3
		.select('#cost-of-living-filter-container')
		.append('svg')
		.attr('width', 240)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(20,25)');

	gRange.call(sliderRange);

	let sliders = d3.selectAll("#cost-of-living-filter-container .slider .parameter-value");
	let sliderId = ["min-index", "max-index"];
	let sliderInitVal = [g_filterValues.cost_of_living.min, g_filterValues.cost_of_living.max];
	sliders.each(function(d, i){
		d3.select(this)
			.append("text")
			.attr("id", ()=> sliderId[i])
			.attr('transform', 'translate(0,-10)')
			.text(() => sliderInitVal[i]);
	});
}