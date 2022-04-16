'use strict';

const mariadb = require('mariadb');

module.exports = app => {
    const model = {};
    const pool = mariadb.createPool({
        host: "localhost",
        user: "admin",
        password: "ptmadmin",
        database: "ptm"
    });
/*    const pool = mariadb.createPool({
        host: app.get('database.host'),
        user: app.get('database.user'),
        password: app.get('database.password'),
        database: app.get('database.name')
    });*/

    /**
     * Get user by email
     * @param {String} userEmail - User email
     * @returns {Promise<*>}
     */
    model.getUserByEmail = async (userEmail) => {
        let conn;
        let userDetails;

        try {
            conn = await pool.getConnection();
            userDetails = await conn.query(`SELECT * FROM users WHERE email='${userEmail}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
        return userDetails;
    }

    /**
     * Create a new user
     * @param {Object} userData - User details
     * @returns {Promise<void>}
     */
    model.createUser = async (userData) => {
        let conn;

        try {
            conn = await pool.getConnection();
            const res = await conn.query("INSERT INTO users value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [userData.id, userData.name, userData.entity, userData.email, userData.password, userData.groupId, userData.activationToken, userData.dateBirth, userData.address,
                    userData.codPost, userData.gender, userData.locality, userData.mobile, userData.nif, userData.country, userData.active, userData.dateActivation, userData.dateCreated,
                    userData.dateModified, userData.lastLogin]);
            //console.log(res);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) return conn.end();
        }
    }

    return model;
}
