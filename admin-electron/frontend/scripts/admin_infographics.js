google.charts.load('current',{packages:['corechart']});
google.charts.setOnLoadCallback(drawChart);

const piechart = document.getElementById('piechart');
const chart = document.getElementById('chart');
const line_graph = document.getElementById('line_graph');


function drawChart() {

        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Topping');
        data.addColumn('number', 'Slices');
        data.addRows([
            ['Shirts', 4],
            ['Jeans', 2],
            ['suits', .5],
            ['Dresses', 1]
        ]);

        var piechart_options = {title:'Profit of each of the highest selling items',
            width:540,
            height:200,
            is3D: true};
        var piechart = new google.visualization.PieChart(document.getElementById('piechart'));
        piechart.draw(data, piechart_options);


}
