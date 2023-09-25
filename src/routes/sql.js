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
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

async function retrieveData() {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    const res = await pool.request().query('SELECT * FROM parti');
    return res.recordset;
  } catch (error) {
    throw error;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function incrementVote(id, user) {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    await pool.request().query(`UPDATE parti SET stemmer = stemmer + 1 WHERE id = ${id.slice(0)}`);
    await pool.request().query(`UPDATE brukere SET stemt = 1 WHERE id = ${user}`);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the route handler
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function getUsers() {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    const res = await pool.request().query('SELECT * FROM brukere');
    return res.recordset;
  } catch (error) {
    throw error;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function getUserById(id) {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    const res = await pool.request().query(`SELECT * FROM brukere WHERE id = ${id}`);

    if (res.recordset.length > 0) {
      return res.recordset[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function addUser(id) {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    await pool.request().query(`INSERT INTO brukere VALUES(${id}, 0)`);
  } catch (error) {
    console.error(error);
    throw error; // Re-throw the error to be handled by the route handler
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

async function hasVoted(id) {
  let pool;
  try {
    pool = await sql.connect(sqlConfig);
    const res = await pool.request().query(`SELECT stemt FROM brukere WHERE id = ${id}`);
    return res.recordset.length > 0 && res.recordset[0].stemt === true;
  } catch (error) {
    throw error;
  } finally {
    if (pool) {
      pool.close();
    }
  }
}

module.exports = {
  retrieveData,
  incrementVote,
  getUsers,
  getUserById,
  addUser,
  hasVoted,
};
