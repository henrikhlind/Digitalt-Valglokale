const data = [
  { parti: 'Rødt', count: 90796, color: '#e90302', image: '../img/logo/r.png' },
  { parti: 'Sosialistisk Venstreparti', count: 177280, color: '#EB4040', image: '../img/logo/sv.png' },
  { parti: 'Senterpartiet', count: 212918, color: '#00843d', image: '../img/logo/sp.png' },
  { parti: 'Arbeiderpartiet', count: 565220, color: '#d70926', image: '../img/logo/ap.png' },
  { parti: 'Miljøpartiet De Grønne', count: 107866, color: '#597d22', image: '../img/logo/mdg.png' },
  { parti: 'Kristelig Folkeparti', count: 103595, color: '#db4f43', image: '../img/logo/krf.png' },
  { parti: 'Venstre', count: 129956, color: '#006666', image: '../img/logo/v.png' },
  { parti: 'Høyre', count: 675970, color: '#0065f1', image: '../img/logo/h.png' },
  { parti: 'Fremskrittspartiet', count: 297294, color: '#004F80', image: '../img/logo/frp.png' },
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
    animation: {
      duration: 200,
      easing: 'easeInSine',
    },
    scales: {
      // x: {
      //   ticks: {
      //     callback: (value, index, values) => {
      //       return '';
      //     },
      //   },
      // },
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
