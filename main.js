// GLOBAL DECLARATIONS
let root = document.documentElement;
root.style.setProperty('--selected-radius', "4");
root.style.setProperty('--selected-border-width', "1");

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


