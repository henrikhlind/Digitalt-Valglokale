const data = {
  labels: [
    'Rødt',
    'Sosialistisk Venstreparti',
    'Senterpartiet',
    'Arbeiderpartiet',
    'Miljøpartiet De Grønne',
    'Kristelig Folkeparti',
    'Venstre',
    'Høyre',
    'Fremskrittspartiet',
  ],
  datasets: [
    {
      label: 'Stemmer',
      data: [90796, 177280, 212918, 565220, 107866, 103595, 129956, 675970, 297294],
      backgroundColor: ['#e90302', '#EB4040', '#00843d', '#d70926', '#597d22', '#db4f43', '#006666', '#0065f1', '#004F80', '#fff'],
      images: [
        '/img/logo/r.png',
        '/img/logo/sv.png',
        '/img/logo/sp.png',
        '/img/logo/ap.png',
        '/img/logo/mdg.png',
        '/img/logo/krf.png',
        '/img/logo/v.png',
        '/img/logo/h.png',
        '/img/logo/frp.png',
      ],
    },
  ],
};
// { parti: 'Rødt', count: 90796, color: '#e90302', image: '../img/logo/r.png' },
// { parti: 'Sosialistisk Venstreparti', count: 177280, color: '#EB4040', image: '../img/logo/sv.png' },
// { parti: 'Senterpartiet', count: 212918, color: '#00843d', image: '../img/logo/sp.png' },
// { parti: 'Arbeiderpartiet', count: 565220, color: '#d70926', image: '../img/logo/ap.png' },
// { parti: 'Miljøpartiet De Grønne', count: 107866, color: '#597d22', image: '../img/logo/mdg.png' },
// { parti: 'Kristelig Folkeparti', count: 103595, color: '#db4f43', image: '../img/logo/krf.png' },
// { parti: 'Venstre', count: 129956, color: '#006666', image: '../img/logo/v.png' },
// { parti: 'Høyre', count: 675970, color: '#0065f1', image: '../img/logo/h.png' },
// { parti: 'Fremskrittspartiet', count: 297294, color: '#004F80', image: '../img/logo/frp.png' },
// ];

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
      ctx.drawImage(label, x.getPixelForValue(index) - width / 2, x.top, width, width);
    });
  },
};

const config = {
  type: 'bar',
  data,
  options: {
    responsive: true,
    animation: {
      duration: 200,
      easing: 'easeInSine',
    },
    scales: {
      x: {
        ticks: {
          callback: (value, index, values) => {
            return '';
          },
        },
      },
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
  plugins: [partiLogo],
};

new Chart($('#chart-container'), config);
