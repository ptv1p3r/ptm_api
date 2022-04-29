'use strict';

const dbPool = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get all countries list
     * @returns {Promise<*>}
     */
    model.getGendersList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, name FROM gender WHERE active=true");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
