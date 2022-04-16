const mariadb = require('mariadb');

/**
 * Database pool
 * @type {Pool}
 */
const dbPool = mariadb.createPool({
    connectionLimit: 10,
    host: global.databaseHost,
    user: global.databaseUser,
    password: global.databasePass,
    database: global.databaseName
    /*
        host: "localhost",
        user: "admin",
        password: "ptmadmin",
        database: "ptm"
    */
});

module.exports = dbPool;
