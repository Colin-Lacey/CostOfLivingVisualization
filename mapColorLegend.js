/*
// adapted from tutorial:
// https://bl.ocks.org/Ro4052/caaf60c1e9afcd8ece95034ea91e1eaa
*/

function makeColorLegend(){
	$("#mapColorLegend").empty();
	const container = d3.select("#mapColorLegend");
  
	  const domain = colorScale.domain();
	  const mapLegendWidth = 50;
	  const mapLegendHeight = 150;
	  
	  const paddedDomain = fc.extentLinear()
			.pad([0.1, 0.1])
			.padUnit("percent")(domain);
		  const [min, max] = paddedDomain;
		  const expandedDomain = d3.range(min, max, (max - min) / mapLegendHeight);
	  
	  const xScale = d3
		  .scaleBand()
		  .domain([0, 1])
		  .range([0, mapLegendWidth]);
	  
	  const yScale = d3
		  .scaleLinear()
		  .domain(paddedDomain)
		  .range([mapLegendHeight, 0]);
	  
	  const svgBar = fc
		.autoBandwidth(fc.seriesSvgBar())
		.xScale(xScale)
		.yScale(yScale)
		.crossValue(0)
		.baseValue((_, i) => (i > 0 ? expandedDomain[i - 1] : 0))
		.mainValue(d => d)
		.decorate(selection => {
		  selection.selectAll("path").style("fill", d => colorScale(d));
		});
	  
	  const axisLabel = fc
		.axisRight(yScale)
		.tickValues([...domain, (domain[1] + domain[0]) / 2])
		.tickSizeOuter(0);
	  
	  const legendSvg = container.append("svg")
		  .attr("height", mapLegendHeight)
		  .attr("width", mapLegendWidth);
	  
	  const legendBar = legendSvg
		  .append("g")
		  .datum(expandedDomain)
		  .call(svgBar);
	  
	  const barWidth = Math.abs(legendBar.node().getBoundingClientRect().x);
	  legendSvg.append("g")
		.attr("transform", `translate(10, 0)`)
		.datum(expandedDomain)
		.call(axisLabel)
		.select(".domain")
		.attr("visibility", "hidden");
	  
	  container.style("margin", "1em");
  }