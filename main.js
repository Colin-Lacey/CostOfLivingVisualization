// GLOBAL DECLARATIONS
let g_root = document.documentElement;

let g_costOfLivingData;

let g_filterValues = { 
	"Cost of Living Index": {},
	"Rent Index": {},
	"Groceries Index": {},
	"Restaurant Price Index": {},
	"Local Purchasing Power Index": {}
};

let g_indexStats =  { 
	"Cost of Living Index": {},
	"Rent Index": {},
	"Groceries Index": {},
	"Restaurant Price Index": {},
	"Local Purchasing Power Index": {}
};

// read in data
Promise.all([
	d3.json("//unpkg.com/world-atlas@1/world/110m.json"),
	d3.csv("cost_of_living.csv"),
	d3.csv('city_coordinates.csv')
]).then(initialize);

function initialize(data){
	g_costOfLivingData = data[1];
	truncateAllIndexValues();
	computeAllIndexStats();
	initializeFilters();
	initializeMap(data[0], data[2]);
	initializeBarChart();
	initializeScatterPlot();
}

function truncateAllIndexValues(){
	g_costOfLivingData.forEach(function (city){
		city["Cost of Living Index"] = Math.trunc(city["Cost of Living Index"]);
		city["Rent Index"] = Math.trunc(city["Rent Index"]);
		city["Groceries Index"] = Math.trunc(city["Groceries Index"]);
		city["Restaurant Price Index"] = Math.trunc(city["Restaurant Price Index"]);
		city["Local Purchasing Power Index"] = Math.trunc(city["Local Purchasing Power Index"]);
	})
}

function computeAllIndexStats(){
	computeIndexStats("Cost of Living Index");
	computeIndexStats("Rent Index");
	computeIndexStats("Groceries Index");
	computeIndexStats("Restaurant Price Index");
	computeIndexStats("Local Purchasing Power Index");
}

function computeIndexStats(indexName){
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

