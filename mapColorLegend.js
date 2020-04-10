/*
// adapted from tutorial:
// https://bl.ocks.org/Ro4052/caaf60c1e9afcd8ece95034ea91e1eaa
*/

function makeColorLegend(color_scale){
	$("#mapColorLegend").empty();
	let mapColorLegendContainer = d3.select("#mapColorLegend");
	
	  let color_scale_domain = color_scale.domain();
	  let mapLegendWidth = 50;
	  let mapLegendHeight = 150;
	  
	  let paddedDomain = fc.extentLinear()
		.pad([0.1, 0.1])
		.padUnit("percent")(color_scale_domain);
		let [min, max] = paddedDomain;
		let expandedDomain = d3.range(min, max, (max - min) / mapLegendHeight);
	  
	  let xScale = d3
		.scaleBand()
		.domain([0, 1])
		.range([0, mapLegendWidth]);
	  
	  let yScale = d3
		.scaleLinear()
		.domain(paddedDomain)
		.range([mapLegendHeight, 0]);
	  
	  let svgBar = fc
	  .autoBandwidth(fc.seriesSvgBar())
	  .xScale(xScale)
	  .yScale(yScale)
	  .crossValue(0)
	  .baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
	  .mainValue(d => d)
	  .decorate(selection => {
		selection.selectAll("path").style("fill", d => color_scale(d));
	  });
	  
	  let axisLabel = fc
	  .axisRight(yScale)
	  .tickValues([...color_scale_domain])
	  .tickSizeOuter(0);
	  
	  let legendSvg = mapColorLegendContainer.append("svg")
		.attr("height", mapLegendHeight)
		.attr("width", mapLegendWidth);
	  
	  let legendBar = legendSvg
		.append("g")
		.datum(expandedDomain)
		.call(svgBar);
	  
	  let barWidth = Math.abs(legendBar.node().getBoundingClientRect().x);
	  legendSvg.append("g")
	  .attr("transform", `translate(5, 0)`)
	  .datum(expandedDomain)
	  .call(axisLabel)
	  .select(".domain")
	  .attr("visibility", "hidden");
	
	  // add max, avg, min labels to ticks
	  let ticks = d3.selectAll("#mapColorLegend svg .tick text");
	  let label = ["min", "avg", "max"];
	  ticks.each(function(d, i){
		  let text = d3.select(this).text();
		  d3.select(this).text(`${text} ${label[i]}`)
	  });

	}