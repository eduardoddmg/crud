const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER || 'postgres',
  host: process.env.HOST || 'localhost',
  database: process.env.DATABASE || 'PMAL',
  password: process.env.PASSWORD || '123456',
  port: process.env.PORT || '5432',
});
module.exports = { pool };
