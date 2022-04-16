'use strict';

const dbPool = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get all countries list
     * @returns {Promise<*>}
     */
    model.getCountriesList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
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
