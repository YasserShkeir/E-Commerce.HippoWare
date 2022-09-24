localStorage.setItem('jwt', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NjUzMDA5MTYsImRhdGEiOnsiaWQiOiI3IiwibmFtZSI6InRlc3QxIGFwaTExIiwidXNlcl90eXBlIjoiMiIsImVtYWlsIjoiYXBpLXRlc3QgZW1haWxzZGFzIn19.uNlmQ1XccyQJbidRL5uoC7c2FxqzY9a3T0taHLCNDMU")
let config = {
  headers: { 'Authorization': localStorage.getItem('jwt') }
}
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
    width: window.screen.width < 1100 ? window.screen.width*.95 : window.screen.width/2,
    height: 250,
  };
  // Draw Chart
  var chart = new google.visualization.LineChart(line_graph);
  chart.draw(data, options);


// PIECHART

  var data = new google.visualization.DataTable();
  data.addColumn("string", "Topping");
  data.addColumn("number", "Slices");
  axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/top-viewed.php',null, config).then(
  function (response) {
    let array = []
    for(const code of response.data){
      array.push([code['name'],parseInt( code['views'])])
    } 
    console.log(array)
    data.addRows(array)
  })
  .catch(function (error) {
    console.log(error);
  })

  var piechart_options = {
    title: "Top 5 Items viewd",
    width: window.screen.width < 1100 ? window.screen.width*.95 : window.screen.width*.4,
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
// discount-codes table 

const table = document.getElementById('tbody')

const addDisc = (code) => {
  const row = document.createElement('tr')

  let col = document.createElement('td')
  col.innerHTML = code['id']
  row.appendChild(col)

  col = document.createElement('td')
  col.innerHTML = code['limits']
  row.appendChild(col)

  col = document.createElement('td')
  col.innerHTML = code['discount']
  row.appendChild(col)

  let del = document.createElement('i')
  del.classList.add('material-icons')
  del.innerHTML = "delete"
  del.style.cursor ="pointer"
  row.appendChild(del)

  del.addEventListener('click', () => {
    let payload = {
      discount: code['id']
    }
    let config = {
      headers: { 'Authorization': localStorage.getItem('jwt') }
    }
    axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/delete-discount-code.php', payload, config).then(
      function (response) {
        if(response) table.removeChild(row)
      })
      .catch(function (error) {
        console.log(error);
      })
  })

  table.append(row)

}


axios.post('http://localhost/E-Commerce.HippoWare/ecommerce-server/seller/discount-codes.php',null, config).then(
  function (response) {
    for(const code of response.data){
      addDisc(code)
    } 
  })
  .catch(function (error) {
    console.log(error);
  })