const Pool = require('pg').Pool
const pool = new Pool( {
    user: "postgres",
    password: '211271',
    host: "localhost",
    port: 5432,
    database: "neighbors_bd"
})


module.exports = pool