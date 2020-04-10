// GLOBAL DECLARATIONS
let g_root = document.documentElement;
g_root.style.setProperty('--selected-radius', "4");
g_root.style.setProperty('--selected-border-width', "1");

let g_costOfLivingData;

// read in data
Promise.all([
  d3.json("//unpkg.com/world-atlas@1/world/110m.json"),
  d3.csv("cost_of_living.csv"),
  d3.csv('city_coordinates.csv')
]).then(initialize);

function initialize(data){
  g_costOfLivingData = data[1];
  initializeMap(data[0], data[2]);
}

function onMouseOverCity(cityData){
  console.log("Moused over:");
  console.log(cityData);
}

function onMouseOutOfCity(cityData){
  console.log("Moused out of:");
  console.log(cityData);
}

function onCitySelected(cityData){
  console.log("Selected:");
  console.log(cityData);
}

function onCityDeselected(cityData){
  console.log("Deselected:");
  console.log(cityData);
}

function getSelectedCities(){
	return getSelectedCitiesOnMap();
}

