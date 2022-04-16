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
     * Get user by email
     * @param {Integer} groupId - Group Id
     * @returns {Promise<*>}
     */
    model.getUserGroupById = async (groupId) => {
        let conn;

        try {
            conn = await pool.getConnection();
            return await conn.query(`SELECT * FROM userGroups WHERE id=${groupId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new user
     * @param {Object} userGroupData - User group details
     * @returns {Promise<void>}
     */
    model.createUserGroup = async (userGroupData) => {
        let conn;

        try {
            conn = await pool.getConnection();
            return await conn.query("INSERT INTO userGroups value (?, ?, ?, ?, ?, ?)",
                [userGroupData.name, userGroupData.description, userGroupData.securityId,
                    userGroupData.active, userGroupData.dateCreated, userGroupData.dateModified]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
