// GLOBAL DECLARATIONS
let g_root = document.documentElement;

let g_costOfLivingData;

let g_indices = [
	"Cost of Living Index",
	"Rent Index",
	"Groceries Index",
	"Restaurant Price Index",
	"Local Purchasing Power Index"
];

let g_filterValues = {}; // will include the min and max selected on the filters
let g_indexStats = {}; // will contain the min, avg, and max for each index

// read in data
Promise.all([
	d3.json("//unpkg.com/world-atlas@1/world/110m.json"),
	d3.csv("cost_of_living.csv"),
	d3.csv('city_coordinates.csv')
]).then(initialize);

function initialize(data){
	g_costOfLivingData = data[1];
	truncateAllIndexValues();
	g_indices.forEach( index => computeIndexStats(index));
	initializeFilters();
	initializeMap(data[0], data[2]);
	initializeBarChart();
	initializeScatterPlot();
}

function truncateAllIndexValues(){
	g_costOfLivingData.forEach(function (city){
		g_indices.forEach( function (index) {
			city[index] = Math.trunc(city[index]);
		});
	});
}

function computeIndexStats(indexName){
	g_indexStats[indexName] = {};

	let sum = 0;
	let total = 0;
	let max = 0;
	let min = 130;
	g_costOfLivingData.forEach(function(d){
		total++;
		sum += parseFloat(d[indexName]);
		if (parseFloat(d[indexName]) > max){
			max = parseFloat(d[indexName]);
		}
		if (parseFloat(d[indexName]) < min){
			min = parseFloat(d[indexName]);
		}
	});
	let avg = sum/total;

	g_indexStats[indexName].min = Math.trunc(min);
	g_indexStats[indexName].avg = Math.trunc(avg);
	g_indexStats[indexName].max = Math.trunc(max);
}

