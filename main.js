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
  console.log(cityData);
  addCityToElement(cityData, "#hoveredCity");
}

function onMouseOutOfCity(cityData){
  console.log(cityData);
  $("#hoveredCity").empty();
}

function onCitySelected(cityData){
  addCityToElement(cityData, "#selectedCities");
}

function onCityDeselected(cityData){
  $(`#selectedCities > .p${cityData.City.replace(/\W/g,'')}`).remove();
}

function getSelectedCities(){
	return getSelectedCitiesOnMap();
}

function addCityToElement(d, element){
	$(element).append(`<p class="p${d.City.replace(/\W/g,'')}"><b>${d.City}</b> </br>
								Cost of Living Index: ${d["Cost of Living Index"]},</br>
								Rent Index: ${d["Rent Index"]},</br>
								Cost of Living Plus Rent Index: ${d["Cost of Living Plus Rent Index"]},</br>
								Groceries Index: ${d["Groceries Index"]},</br>
								Restaurant Price Index: ${d["Restaurant Price Index"]},</br>
								Local Purchasing Power Index: ${d["Local Purchasing Power Index"]}</p>`);
  }

