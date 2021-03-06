
function initializeFilters(){
	setInitialFilterValues();
	g_indices.forEach(function(index){
		appendFilter(index.replace(/ /g, "_"), index);
	});
}

function setInitialFilterValues(){
	g_indices.forEach( function(index){
		g_filterValues[index] = {};
		g_filterValues[index].min = g_indexStats[index].min;
		g_filterValues[index].max = g_indexStats[index].max;
	});
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
		.tickValues(generateTicks(g_indexStats[filterName].min, g_indexStats[filterName].max))
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
		.attr('height', 50)
		.append('g')
		.attr('transform', 'translate(20,10)');

	gRange.call(sliderRange);
}

function generateTicks(min, max){
	let firstTick = Math.ceil(min/10)*10;
	let lastTick = Math.floor(max/10)*10;

	let diff = 20;

	let ticks = [min];
	let currentVal = firstTick+diff;
	while (currentVal+diff <= lastTick){
		ticks.push(currentVal);
		currentVal = currentVal + diff;
	}
	ticks.push(max);
	return ticks;
}