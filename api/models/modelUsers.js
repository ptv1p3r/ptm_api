'use strict';

const { dbPool, buildPatchSqlQuery } = require('./../helpers/db');

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
     * Get user by id
     * @param {String} userId - User id
     * @returns {Promise<void>}
     */
    model.getUserById = async (userId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, name, entity, email, password, groupId, encryptKey, dateBirth, address, codPost, genderId, locality, mobile, nif, countryId, active, 
                CONVERT_TZ(activationDate,'UTC','Europe/Lisbon') AS activationDate, CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified, CONVERT_TZ(lastLogin,'UTC','Europe/Lisbon') AS lastLogin
                FROM users WHERE id='${userId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists all users
     * @returns {Promise<void>}
     */
    model.userViewById = async () => {
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
            return await conn.query(`SELECT id, name, entity, email, password, groupId, dateBirth, address, codPost, genderId, locality, mobile, nif, countryId, active,
                CONVERT_TZ(activationDate,'UTC','Europe/Lisbon') AS activationDate, CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified, CONVERT_TZ(lastLogin,'UTC','Europe/Lisbon') AS lastLogin
                FROM users WHERE email='${userEmail}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get user by activation token
     * @param {String} activationToken - Activation Token
     * @returns {Promise<*>}
     */
    model.getUserEmailByActivationToken = async (activationToken) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT email FROM users WHERE activationToken='${activationToken}'`);
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
     * Activate user with token
     * @param {String} activationToken - User activation token
     * @returns {Promise<*>}
     */
    model.activateUser = async (activationToken) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE users SET activationDate=NOW(), dateModified=NOW(), active=1, activationToken=null WHERE activationToken='${activationToken}'`);
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

            return await conn.query("INSERT INTO users value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [userData.id, userData.name, userData.entity, userData.email, userData.password, userData.groupId, userData.activationToken,
                    null, userData.dateBirth, userData.address, userData.codPost, userData.genderId, userData.locality, userData.mobile, userData.nif,
                    userData.countryId, userData.active, userData.dateActivation, userData.dateCreated, userData.dateModified, userData.lastLogin]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Set user encryption key (iv)
     * @param userEncryptedData
     * @returns {Promise<any>}
     */
    model.setUserEncryptKey = async (userEncryptedData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`UPDATE users SET encryptKey='${userEncryptedData.iv}', dateModified=NOW() 
                WHERE id='${userEncryptedData.id}'`);

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit a user
     * @param {Object} userData - User details
     * @returns {Promise<void>}
     */
    model.editPutUser = async (userData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`UPDATE users SET name='${userData.name}', entity='${userData.entity}', password='${userData.password}', groupId=${userData.groupId},
                dateBirth='${userData.dateBirth}', address='${userData.address}', codPost='${userData.codPost}', genderId=${userData.genderId}, locality='${userData.locality}', 
                mobile='${userData.mobile}', nif=${userData.nif}, countryId=${userData.countryId}, dateModified=NOW() 
                WHERE id='${userData.id}'`);

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    model.editPatchUser = async (userData) => {
        let conn;

        try {

            conn = await dbPool.getConnection();

            return await conn.query(buildPatchSqlQuery('users',userData.id, userData.body));

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete user
     * @param {String} userId - User group details
     * @returns {*}
     */
    model.deleteUser = async (userId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM users WHERE id='${userId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
