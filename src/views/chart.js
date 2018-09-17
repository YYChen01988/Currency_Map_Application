const PubSub = require('../helpers/pub_sub');

const Chart = function(){

}


Chart.prototype.bindEvents = function(){
  PubSub.subscribe("CurrencyList:country-ready", (event) => {
    console.log(event);
    google.charts.load('current', {packages: ['corechart', 'bar']});
    google.charts.setOnLoadCallback(drawBasic);

    function drawBasic() {
      var populationData = [['Country', 'Population']];
      event.detail.sort(function(a, b) {
        return b.population - a.population;
      });
      event.detail.forEach(country => {
        populationData.push([country.name, country.population])
      })

      var data = google.visualization.arrayToDataTable(populationData);

      var options = {
        title: 'Populations',
        chartArea: {width: '50%'},
        hAxis: {
          title: 'Total Population',
          minValue: 0
        },
        vAxis: {
          title: 'Country'
        }
      };

      var chart = new google.visualization.BarChart(document.getElementById('chart'));

      chart.draw(data, options);
    }

  });
};

module.exports = Chart;
