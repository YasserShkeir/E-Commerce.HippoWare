window.onload = () => {
  const navBar = document.querySelector(".nav-bar");

  const navContent = `<img
src="/admin-electron/assets/images/logo-removebg-preview.png"
alt=""
class="header-logo"
/>

<div class="header-links">
<a
  href="admin_sellers.html"
  class="header-link"
  id="header_sellerss_btn"
  >Sellers</a
>
<a href="admin_client.html" class="header-link" id="header_clients_btn">Clients</a>

<a href="admin_infographics.html" class="header-link">Statistics</a>
<a href="#" class="header-link">Log Out</a>
</div>`;

  navBar.innerHTML += navContent;
};

google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawChart);

const piechart = document.getElementById("piechart");
const chart = document.getElementById("chart");
const line_graph = document.getElementById("line_graph");

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
    title: "Sales",
    hAxis: { title: "Time" },
    vAxis: { title: "Sales(in thousands)" },
    legend: "none",
    width: 1080,
    height: 165,
  };
  // Draw Chart
  var chart = new google.visualization.LineChart(line_graph);
  chart.draw(data, options);
}

function drawChart() {
  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  data.addRows([
    ["Shirts", 4],
    ["Jeans", 2],
    ["suits", 0.5],
    ["Dresses", 1],
  ]);

  var piechart_options = {
    title: "Profit of each of the highest selling items",
    width: 540,
    height: 200,
    is3D: true,
  };
  var piechart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );
  piechart.draw(data, piechart_options);

  var barchart_options = {
    title: "Highest selling items",
    width: 540,
    height: 200,
    legend: "none",
  };
  var barchart = new google.visualization.BarChart(
    document.getElementById("chart")
  );
  barchart.draw(data, barchart_options);

  var data = google.visualization.arrayToDataTable([
    ["Sales", "Time"],
    [50, 7],
    [60, 8],
    [70, 8],
    [80, 9],
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
    title: "Sales",
    hAxis: { title: "Time" },
    vAxis: { title: "Sales" },
    legend: "none",
    width: 1080,
    height: 225,
  };
  // Draw Chart
  var chart = new google.visualization.LineChart(line_graph);
  chart.draw(data, options);
}
