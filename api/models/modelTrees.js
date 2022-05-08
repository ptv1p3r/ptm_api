'use strict';

const { dbPool, buildPatchSqlQuery } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Lists all trees
     * @returns {Promise<void>}
     */
    model.treesListAll = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("SELECT id, typeId, lat, lng, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified, " +
                "FROM trees");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get tree by id
     * @param {String} treeId - Tree id
     * @returns {Promise<void>}
     */
    model.getTreeById = async (treeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, typeId, lat, lng, active, 
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM trees WHERE id='${treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new tree
     * @param {Object} userData - User details
     * @returns {Promise<void>}
     */
    model.createTree = async (userData) => {
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
