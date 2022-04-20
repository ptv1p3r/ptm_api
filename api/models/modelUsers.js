'use strict';

const dbPool = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Lists all users
     * @returns {Promise<void>}
     */
    model.usersListAll = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("SELECT id, name, entity, email, groupId, dateBirth, address, codPost, genderId, locality, mobile, nif, countryId, active, " +
                "CONVERT_TZ(activationDate,'UTC','Europe/Lisbon') AS activationDate, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified, " +
                "CONVERT_TZ(lastLogin,'UTC','Europe/Lisbon') AS lastLogin " +
                "FROM users");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get user by email
     * @param {String} userEmail - User email
     * @returns {Promise<*>}
     */
    model.getUserByEmail = async (userEmail) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT * FROM users WHERE email='${userEmail}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Set user last login timestamp
     * @param {String} userId - User identifier
     * @returns {Promise<*>}
     */
    model.setUserLoginTime = async (userId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE users SET lastLogin=NOW() WHERE id='${userId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new user
     * @param {Object} userData - User details
     * @returns {Promise<void>}
     */
    model.createUser = async (userData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("INSERT INTO users value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [userData.id, userData.name, userData.entity, userData.email, userData.password, userData.groupId, userData.activationToken,
                    userData.dateBirth, userData.address, userData.codPost, userData.genderId, userData.locality, userData.mobile, userData.nif,
                    userData.countryId, userData.active, userData.dateActivation, userData.dateCreated, userData.dateModified, userData.lastLogin]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
