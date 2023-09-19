const { response } = require('express');
const express = require('express');
const sql = require('mssql');

const app = express();

const sqlConfig = {
  user: 'skole',
  password: 'skole2023',
  server: 'glemmen.bergersen.dk',
  database: 'Henrik_Lindstad',
  port: 4729,
  options: {
    trustServerCertificate: true,
  },
};

async function retrieveData() {
  try {
    await sql.connect(sqlConfig);

    const res = await sql.query('SELECT * FROM parti');
    return res.recordset;
  } catch (error) {
    throw error;
  } finally {
    sql.close();
  }
}

function incrementVote(id) {
  try {
    sql.connect(sqlConfig).then(function () {
      new sql.Request().query(`UPDATE parti SET stemmer = stemmer + 1 WHERE id = ${id.slice(0)}`);
    });
  } catch (error) {
    console.dir(error);
  }
}

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile('/index.html');
});

app.get('/verify', function (req, res) {
  res.sendFile(__dirname + '/public/html/verify.html');
});

app.get('/vote', function (req, res) {
  res.sendFile(__dirname + '/public/html/vote.html');
});

app.get('/results', function (req, res) {
  res.sendFile(__dirname + '/public/html/results.html');
});

app.get('/confirmed', function (req, res) {
  res.sendFile(__dirname + '/public/html/confirmed.html');
});

app.get('/retrieve-data', async (req, res) => {
  try {
    const data = await retrieveData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving data from MSSQL.' });
  }
});

app.get('/increment-vote/:id', (req, res) => {
  const id = req.params.id;
  incrementVote(id);
  res.send(`Incrementing data for ID: ${id}`);
});

app.listen(process.env.PORT || 3000);
