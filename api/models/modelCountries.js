'use strict';

const mariadb = require('mariadb');

module.exports = app => {
    const model = {};
/*    const pool = mariadb.createPool({
        host: "localhost",
        user: "admin",
        password: "ptmadmin",
        database: "ptm"
    });
    const pool = mariadb.createPool({
        host: app.get('database.host'),
        user: app.get('database.user'),
        password: app.get('database.password'),
        database: app.get('database.name')
    });*/
    const pool = mariadb.createPool({
        host: global.databaseHost,
        user: global.databaseUser,
        password: global.databasePass,
        database: global.databaseName
    });

    /**
     * Get all countries list
     * @returns {Promise<*>}
     */
    model.getCountriesList = async () => {
        let conn;

        try {
            conn = await pool.getConnection();
            return await conn.query("SELECT id, name, code FROM countries WHERE active=true");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
