
function initializeFilters(){
	let min = 0;
	let max = 140;
	var sliderRange = d3
		.sliderBottom()
		.min(min)
		.max(max)
		.width(205)
		.ticks(7)
		.default([min, max])
		.fill('#2196f3')
		.on('onchange', val => {
			d3.select("#min-index").text(Math.trunc(val[0]));
			d3.select("#max-index").text(Math.trunc(val[1]));
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
	let sliderInitVal = [min, max];
	sliders.each(function(d, i){
		d3.select(this)
			.append("text")
			.attr("id", ()=> sliderId[i])
			.attr('transform', 'translate(0,-10)')
			.text(() => sliderInitVal[i]);
	});
}