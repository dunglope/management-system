const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'PTTKHT',
  password: 'Dung.io2',
  port: 5432,
});

module.exports = pool;
