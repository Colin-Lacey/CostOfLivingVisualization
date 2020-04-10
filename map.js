let mapSvg;
let mapGroup;
let mapHeight;
let mapWidth;
let mapProjection;
let mapPath;
let selectedIndex;
let mapColorScale;

function initializeMap(world_topoJSON_data, city_coordinates){
	addCoordinatesToCostOfLivingData(city_coordinates);
	drawMap(world_topoJSON_data);

	selectedIndex = $('#mapIndexSelector').val();

	$('#mapIndexSelector').on('change', function(){
	  selectedIndex = $(this).children("option:selected").val();
	  refreshPlottedCities();
	});

	refreshPlottedCities();
}

function addCoordinatesToCostOfLivingData(city_coordinates){
	g_costOfLivingData;
  
	// add coordinates to cost of living data
	g_costOfLivingData.forEach(function(cityCostData){
	  cityCords = city_coordinates.find(function(cityCoordinatesData){ return cityCostData.City == cityCoordinatesData.city_ascii && cityCostData.Country == cityCoordinatesData.country;});
	  if (cityCords != undefined){  // if found lat and long
		cityCostData.lat = cityCords.lat; cityCostData.lng = cityCords.lng;
	  }
	  else {
		console.log(`Didn't find coordinates for: ${cityCostData.City}, ${cityCostData.Country}`);
	  }
	});
  }

function drawMap(world_topoJSON_data){
	mapHeight = 400;
	mapWidth = 950;
	
	// create projection using Mercator.
	// Converts a lattitude and longitude into a screen coordinate
	// according to the specified projection type
	mapProjection = d3.geoMercator()
	  .translate([mapWidth/2, mapHeight/2+80])
	  .scale((mapWidth - 1) / 2 / Math.PI);
  
	// create a path generator to translate from topoJSON geometry to SVG paths
	mapPath = d3.geoPath()
	.projection(mapProjection);
  
	const zoom = d3.zoom()
	.scaleExtent([1, 8])
	.on('zoom', zoomed);
  
	mapSvg = d3.select( "svg" )
	  .attr( "width", mapWidth)
	  .attr( "height", mapHeight);
	
	mapGroup = mapSvg.append("g");
  
	mapSvg.call(zoom);
  
	mapGroup.append('path')
	  .datum({ type: 'Sphere' })
	  .attr('class', 'sphere')
	  .attr('d', mapPath);
  
	mapGroup.append('path')
	  .datum(topojson.merge(world_topoJSON_data, world_topoJSON_data.objects.countries.geometries))
	  .attr('class', 'land')
	  .attr('d', mapPath);
  
	mapGroup.append('path')
	  .datum(topojson.mesh(world_topoJSON_data, world_topoJSON_data.objects.countries, (a, b) => a !== b))
	  .attr('class', 'boundary')
	  .attr('d', mapPath);
  }

  function zoomed() {
	mapGroup.selectAll('path')
	  .attr('transform', d3.event.transform);
	
	mapSvg.selectAll(".city-circle")
	  .attr('transform', d3.event.transform)
	  .attr('r', 2/Math.sqrt(d3.event.transform.k));
	
	g_root.style.setProperty('--selected-radius', `${3/Math.sqrt(d3.event.transform.k)}`);
	g_root.style.setProperty('--selected-border-width', `${1/Math.sqrt(d3.event.transform.k)}`);
  }

  function refreshPlottedCities(){

	computeColorScale();
	makeColorLegend(mapColorScale);
  
	let cityUpdateSelection = mapSvg.selectAll(".city-circle").data(g_costOfLivingData);
  
	let cityEnterSelection = cityUpdateSelection.enter();
  
	cityEnterSelection
	  .append("circle")
	  .attr("class", "city-circle")
	  .on("click", onClickCity)
	  .on("mouseover", onMouseOverCity)
	  .on("mouseout", onMouseOutOfCity)
	  .attr("r", 2)
	  .merge(cityUpdateSelection)
	  .attr("fill", d => mapColorScale(d[selectedIndex]))
	  .attr("cx", function(d){
		let coords = mapProjection([d.lng, d.lat]);
		return coords[0];
	  })
	  .attr("cy", function(d){
		let coords = mapProjection([d.lng, d.lat]);
		return coords[1];
	  });
  
	  cityUpdateSelection.exit()
		.remove();
  }

  // HELPER FUNCTIONS

function computeColorScale(){
	// make white the average index value for the currently selected index, rather than simply 50
	let sum = 0;
	let total = 0;
	let max = 0;
	let min = 130;
	g_costOfLivingData.forEach(function(d){
	  total++;
	  sum += parseFloat(d[selectedIndex]);
	  if (parseFloat(d[selectedIndex]) > max){
		max = parseFloat(d[selectedIndex]);
	  }
	  if (parseFloat(d[selectedIndex]) < min){
		min = parseFloat(d[selectedIndex]);
	  }
	});
	let avg = sum/total;
  
	console.log("sum: ", sum);
	console.log("total: ", total);
	console.log("min: ", min);
	console.log("average: ", avg);
	console.log("max: ", max);
  
	mapColorScale = d3.scaleLinear()
	  .domain([min, avg, max])
	  .range(['#762a83','white', '#1b7837']);
  }
  
  
  function onMouseOverCity(d){
	d3.select(this).classed("mouseover", true);
	addCityToElement(d, "#hoveredCity");
  }
  
  function onMouseOutOfCity(d){
	d3.select(this).classed("mouseover", false);
	$("#hoveredCity").empty();
  }
  
  function onClickCity(d){
	let thisCity = d3.select(this);
	if (thisCity.classed("selected")){
	  thisCity.classed("selected", false);
	  $(`#selectedCities > .p${d.City.replace(/\W/g,'')}`).remove();
	}
	else{
	  thisCity.classed("selected", true);
	  addCityToElement(d, "#selectedCities");
	}        
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
  
  