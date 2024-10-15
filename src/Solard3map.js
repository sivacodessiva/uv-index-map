import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Map2Component() {

  useEffect(() => {
    const width = 960;
    const height = 600;

    // Clear any existing SVG elements, sliders, labels, or legends to avoid duplicates
    d3.select("#d3-map2").select("svg").remove();
    d3.select("#d3-map2").select("input").remove();
    d3.select("#d3-map2").select("div#year-label").remove();
    d3.select("#d3-map2").select("svg.legend").remove();

    const svg = d3.select("#d3-map2")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    const projection = d3.geoAlbersUsa()
      .translate([width / 2, height / 2])
      .scale(1000);

    const path = d3.geoPath().projection(projection);

    // Load the GeoJSON file
    d3.json('/gz_2010_us_040_00_500k.json').then(function(us) {

      // Draw the map
      svg.append("g")
        .selectAll("path")
        .data(us.features)
        .enter().append("path")
        .attr("d", path)
        .attr("class", "state")
        .style("fill", "#ccc")
        .style("stroke", "#fff");

      // Load solar irradiance data for Map 2
      d3.json('/solar_irradiance.json').then(function(data) {

        // Set up the color scale
        const color = d3.scaleQuantize([0, d3.max(data, d => d.Value)], d3.schemeYlGn[9]);

        // Create a year slider for map 2
        let year = 2004;  // Default starting year
        d3.select("#d3-map2").append("input")
          .attr("type", "range")
          .attr("min", 2004)
          .attr("max", 2020)
          .attr("value", year)
          .on("input", function() {
            year = +this.value;
            d3.select("#year-label").text(`Year: ${year}`);  // Update year label
            updateMap2(year);
          });

        // Add a label for the slider
        d3.select("#d3-map2").append("div")
          .attr("id", "year-label")
          .style("margin", "10px")
          .text(`Year: ${year}`);

        // Update map2 function based on the selected year
        function updateMap2(year) {
          const yearData = data.filter(d => d.Year === year);
          svg.selectAll(".state")
            .style("fill", d => {
              const stateData = yearData.find(s => s.State === d.properties.NAME);
              return stateData ? color(stateData.Value) : "#ccc";
            });
        }

        // Initialize map 2 with the default year
        updateMap2(year);

        // Add legend for solar irradiance
        const legend = d3.select("#d3-map2").append("svg")
          .attr("class", "legend")
          .attr("width", 200)
          .attr("height", 50)
          .style("margin", "10px");

        const legendScale = d3.scaleLinear()
          .domain([0, d3.max(data, d => d.Value)])
          .range([0, 200]);

        const legendAxis = d3.axisBottom(legendScale)
          .ticks(5);

        legend.append("g")
          .attr("transform", "translate(0, 30)")
          .call(legendAxis);

        // Add colored rectangles to represent the scale
        const legendColors = d3.range(0, 200, 200 / 9);
        legend.selectAll("rect")
          .data(legendColors)
          .enter().append("rect")
          .attr("x", d => d)
          .attr("y", 10)
          .attr("width", 200 / 9)
          .attr("height", 20)
          .style("fill", (d, i) => d3.schemeYlGn[9][i]);
      });
    });
  }, []); // Empty dependency array to run only on component mount

  return (
    <div id="d3-map2">
      <p>Solar Irradiance Map 2 Visualization</p>
    </div>
  );
}

export default Map2Component;
