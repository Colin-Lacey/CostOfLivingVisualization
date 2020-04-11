
function initializeFilters(){
	let filterVarName = "cost_of_living";
	let filterNameFormal = "Cost Of Living Index";
	let divId = "cost_of_living_filter_container";

	let p = $("#filterContainer").append(
		`<p>Filter ${filterNameFormal}</p>
		<div id="${divId}"></div>
	`);

	var sliderRange = d3
		.sliderBottom()
		.min(g_filterValues[filterVarName].min)
		.max(g_filterValues[filterVarName].max)
		.width(205)
		.ticks(7)
		.default([g_filterValues[filterVarName].min, g_filterValues[filterVarName].max])
		.fill('#2196f3')
		.on('onchange', val => {
			d3.select("#min-index").text(Math.trunc(val[0]));
			d3.select("#max-index").text(Math.trunc(val[1]));

			g_filterValues[filterVarName].min = Math.trunc(val[0]);
			g_filterValues[filterVarName].max = Math.trunc(val[1]);
			$.publish("filtersUpdated");
		});

	var gRange = d3
		.select(`#${divId}`)
		.append('svg')
		.attr('width', 240)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(20,25)');

	gRange.call(sliderRange);

	let sliders = d3.selectAll(`#${divId} .slider .parameter-value`);
	let sliderId = ["min-index", "max-index"];
	let sliderInitVal = [g_filterValues[filterVarName].min, g_filterValues[filterVarName].max];
	sliders.each(function(d, i){
		d3.select(this)
			.append("text")
			.attr("id", ()=> sliderId[i])
			.attr('transform', 'translate(0,-10)')
			.text(() => sliderInitVal[i]);
	});
}