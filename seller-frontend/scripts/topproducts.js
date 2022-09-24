google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);


const line_graph = document.querySelector(".product-linegraph");
const revenue = document.querySelector(".revenue");

// DRAWING THE INFOGRAPHICS
function drawChart() {
  // Set Data
  var data = google.visualization.arrayToDataTable([
    ["Sales", "Time"],
    [20, 7],
    [60, 8],
    [70, 0],
    [90, 9],
    [100, 9],
    [110, 10],
    [120, 11],
    [130, 14],
    [140, 14],
    [150, 15],
  ]);
  // Set Options
  var options = {
    title: "Views in last month",
    hAxis: { title: "" },
    vAxis: { title: "" },
    legend: "none",
    width: window.screen.width/2,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.LineChart(line_graph);
  chart.draw(data, options);


// PIECHART

  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Shirts", 4],
    ["Jeans", 2],
    ["suits", 0.5],
    ["Dresses", 1],
    ["Hoodies", 1.5]
  ]);

  var piechart_options = {
    title: "Top 5 Items viewd",
    width: window.screen.width*.4,
    height: 340,
    is3D: true,
  };
  var piechart = new google.visualization.PieChart(document.querySelector(".piechart"));
  piechart.draw(data, piechart_options);


// REVENUE LINE GRAPH
  var data = google.visualization.arrayToDataTable([
    ["Sales", "Time"],
    [20, 7],
    [60, 8],
    [70, 8],
    [90, 9],
    [100, 5],
    [110, 0],
    [120, 11],
    [130, 7],
    [140, 14],
    [150, 12],
  ]);
  // Set Options
  var options = {
    title: "Revenue",
    hAxis: { title: "" },
    vAxis: { title: "" },
    legend: "none",
    width: window.screen.width,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.LineChart(revenue);
  chart.draw(data, options);

};