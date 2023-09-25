fetch('/retrieve-data')
  .then((response) => response.json())
  .then((data) => {
    generateChart(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });

const data = [];

function generateChart(data) {
  data = [
    { parti: 'Rødt', count: data[0].stemmer, color: '#e90302', image: '../img/logo/r.png' },
    { parti: 'Sosialistisk Venstreparti', count: data[1].stemmer, color: '#EB4040', image: '../img/logo/sv.png' },
    { parti: 'Arbeiderpartiet', count: data[2].stemmer, color: '#d70926', image: '../img/logo/ap.png' },
    { parti: 'Senterpartiet', count: data[3].stemmer, color: '#00843d', image: '../img/logo/sp.png' },
    { parti: 'Miljøpartiet De Grønne', count: data[4].stemmer, color: '#597d22', image: '../img/logo/mdg.png' },
    { parti: 'Kristelig Folkeparti', count: data[5].stemmer, color: '#db4f43', image: '../img/logo/krf.png' },
    { parti: 'Venstre', count: data[6].stemmer, color: '#006666', image: '../img/logo/v.png' },
    { parti: 'Høyre', count: data[7].stemmer, color: '#0065f1', image: '../img/logo/h.png' },
    { parti: 'Fremskrittspartiet', count: data[8].stemmer, color: '#004F80', image: '../img/logo/frp.png' },
  ];
  const partiLogo = {
    id: 'partiLogo',
    afterDatasetsDraw(chart, args, plugins) {
      const {
        ctx,
        data,
        chartArea: { bottom },
        scales: { x },
      } = chart;

      ctx.save();

      data.datasets[0].images.forEach((image, index) => {
        const label = new Image();
        label.src = image;
        const width = 30;
        const height = label.height / (label.width / width);

        if (label.complete) {
          ctx.drawImage(label, x.getPixelForValue(index) - width / 2, x.top, width, height);
        } else {
          label.onload = () => chart.draw();
        }
      });
    },
  };

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
    // plugins: [partiLogo],
  };

  new Chart($('#chart-container'), config);
}
