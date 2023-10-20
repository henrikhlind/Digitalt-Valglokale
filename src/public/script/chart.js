const baseData = Array.from({ length: 9 }, () => 'stemmer');
let barChart = null;
let pieChart = null;
generateBarChart(baseData);
generatePieChart(baseData);

fetch('/retrieve-data')
  .then((response) => response.json())
  .then((data) => {
    const chartData = [
      { parti: 'Rødt', count: data[0].stemmer, color: '#e90302' },
      { parti: 'Sosialistisk Venstreparti', count: data[1].stemmer, color: '#EB4040' },
      { parti: 'Arbeiderpartiet', count: data[2].stemmer, color: '#d70926' },
      { parti: 'Senterpartiet', count: data[3].stemmer, color: '#00843d' },
      { parti: 'Miljøpartiet De Grønne', count: data[4].stemmer, color: '#597d22' },
      { parti: 'Kristelig Folkeparti', count: data[5].stemmer, color: '#db4f43' },
      { parti: 'Venstre', count: data[6].stemmer, color: '#006666' },
      { parti: 'Høyre', count: data[7].stemmer, color: '#0065f1' },
      { parti: 'Fremskrittspartiet', count: data[8].stemmer, color: '#004F80' },
    ];
    generateBarChart(chartData);
    generatePieChart(chartData);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

function generateBarChart(data) {
  if (barChart) barChart.destroy();
  const config = {
    type: 'bar',
    data: {
      labels: data.map((row) => row.parti),
      datasets: [
        {
          label: 'Stemmer',
          data: data.map((row) => row.count),
          backgroundColor: data.map((row) => row.color),
          color: data.map((row) => row.color),
        },
      ],
    },
    options: {
      responsive: true,
      hover: { mode: null },
      animation: {
        duration: 200,
        easing: 'easeInSine',
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            display: true,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
      },
    },
  };

  barChart = new Chart($('#bar-chart'), config);
}

function generatePieChart(data) {
  if (pieChart) pieChart.destroy();
  const config = {
    type: 'pie',
    data: {
      labels: data.map((row) => row.parti),
      datasets: [
        {
          label: 'Stemmer',
          data: data.map((row) => row.count),
          backgroundColor: data.map((row) => row.color),
          color: data.map((row) => row.color),
        },
      ],
    },
    options: {
      responsive: true,
      hover: { mode: null },
      animation: {
        duration: 200,
        easing: 'easeInSine',
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        datalabels: {
          color: '#f0f0f0',
          formatter: function (value, index, values) {
            if (value > 0) {
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);
              value = value.join(',');
              return value;
            } else {
              value = '';
              return value;
            }
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  };

  pieChart = new Chart($('#pie-chart'), config);
}

$('.slide-1').on('click', function (e) {
  $('.slide-button.active')[0].classList.remove('active');
  $(this)[0].classList.add('active');
  $('.pie-container').css('transform', 'translateX(63vw)');
  $('.bar-container').css('transform', 'translateX(0)');
});

$('.slide-2').on('click', function (e) {
  $('.slide-button.active')[0].classList.remove('active');
  $(this)[0].classList.add('active');
  $('.pie-container').css('transform', 'translateX(0)');
  $('.bar-container').css('transform', 'translateX(-80vw)');
});
