const { Pool } = require('pg');
const connectionString = 'postgres://yaxbtzrl:ogaKU0YCAZn3TpvYAevmX24dvo5bxTcr@tyke.db.elephantsql.com/yaxbtzrl';

const pool = new Pool({
  connectionString,
})

module.exports = pool;

