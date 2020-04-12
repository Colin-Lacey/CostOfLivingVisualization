// GLOBAL DECLARATIONS
let g_root = document.documentElement;

let g_costOfLivingData;

let g_filterValues = { 
	"Cost of Living Index": {min: 0, max: 140},
	"Rent Index": {min: 0, max: 140},
	"Groceries Index": {min: 0, max: 140},
	"Restaurant Price Index": {min: 0, max: 140},
	"Local Purchasing Power Index": {min: 0, max: 140}
};

let g_indexStats = {
	cost_of_living: {}, // record min, avg, and max for each
	rent: {},
	groceries: {},
	restaurant_price: {},
	local_purchasing_power: {}
};

// read in data
Promise.all([
	d3.json("//unpkg.com/world-atlas@1/world/110m.json"),
	d3.csv("cost_of_living.csv"),
	d3.csv('city_coordinates.csv')
]).then(initialize);

function initialize(data){
	g_costOfLivingData = data[1];
	computeAllIndexStats();
	initializeMap(data[0], data[2]);
	initializeFilters();
	initializeBarChart();
	initializeScatterPlot();
}

function computeAllIndexStats(){

}

function computeIndexStats(){
	console.log(g_costOfLivingData);
}

