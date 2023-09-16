const { response } = require('express');
const express = require('express');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));
app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js/auto/'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

app.get('/verify', function (req, res) {
  res.sendFile('/verify.html');
});

app.get('/vote', function (req, res) {
  res.sendFile('/html/vote.html');
});

app.get('/results', function (req, res) {
  res.sendFile('/html/results.html');
});

app.get('/confirm', function (req, res) {
  res.sendFile('/html/confirm.html');
});

app.listen(3000, function () {
  console.log('Server has started on port 3000.');
});
