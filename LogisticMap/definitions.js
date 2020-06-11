var ctx = document.getElementById('chart').getContext('2d');
var chart1 = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    datasets: [{
      lineTension: 0,
      label: 'Population size in %',
      data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          suggestedMax: 120
        }
      }]
    }
  }
});



var body = document.getElementsByTagName('body')[0]

var xnSlider = document.getElementById('xn-slider')
var xnVal = document.getElementById('xn-val')

var rSlider = document.getElementById('r-slider')
var rVal = document.getElementById('r-val')

var iterationsSlider = document.getElementById('iterations-slider')
var iterationsVal = document.getElementById('iterations-val')
