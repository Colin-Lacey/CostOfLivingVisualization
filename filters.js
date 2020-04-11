
function initializeFilters(){
	var data = [0, 130];
	var sliderRange = d3
		.sliderBottom()
		.min(d3.min(data))
		.max(d3.max(data))
		.width(180)
		.ticks(5)
		.default([0, 130])
		.fill('#2196f3')
		.on('onchange', val => {
			d3.select('#value-range').text(val.map(d3.format(',')).join('-'));
	});

	var gRange = d3
		.select('#slider-range')
		.append('svg')
		.attr('width', 240)
		.attr('height', 100)
		.append('g')
		.attr('transform', 'translate(30,30)');

	gRange.call(sliderRange);

	d3.select('#value-range').text(
		sliderRange.value()
		.map(d3.format(","))
		.join('-')
	);
}