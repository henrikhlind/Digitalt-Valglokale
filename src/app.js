const express = require('express');
const app = express();
const sql = require(__dirname + '/routes/sql.js');

const routePaths = ['/verify', '/vote', '/results', '/confirmed'];

// static assets
app.use(express.static(__dirname + '/public'));

// routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

routePaths.forEach((routePath) => {
  app.get(routePath, (req, res) => {
    res.sendFile(__dirname + '/views/pages' + routePath + '.html');
  });
});

// sql routes
app.get('/retrieve-data', async (req, res) => {
  try {
    const data = await sql.retrieveData();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while retrieving data from MSSQL.' });
  }
});

app.get('/increment-vote/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await sql.incrementVote(id);
    res.send(`Incrementing data for ID: ${id}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while incrementing vote.' });
  }
});

// start server
app.listen(process.env.PORT || 3000);
