const mariadb = require('mariadb');

/*    const pool = mariadb.createPool({
        host: "localhost",
        user: "admin",
        password: "ptmadmin",
        database: "ptm"
    });*/

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
});

module.exports = dbPool;
