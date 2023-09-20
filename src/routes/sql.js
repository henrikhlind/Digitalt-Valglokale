const sql = require('mssql');
require('dotenv').config();

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  port: parseInt(process.env.DB_PORT),
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

async function incrementVote(id) {
  try {
    await sql.connect(sqlConfig);
    await new sql.Request().query(`UPDATE parti SET stemmer = stemmer + 1 WHERE id = ${id.slice(0)}`);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the route handler
  } finally {
    sql.close();
  }
}

module.exports = {
  retrieveData,
  incrementVote,
};
