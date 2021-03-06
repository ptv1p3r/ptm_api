'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get tree usage on users
     * @param {String} treeId
     * @returns {Promise<any>}
     */
    model.getTreeUsageCount = async (treeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT COUNT(*) AS total
                                     FROM usersTrees WHERE treeId='${treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get user tree by id
     * @param {Object} userTreeData - User tree details
     * @returns {Promise<*>}
     */
    model.getUserTreeById = async (userTreeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT userId, treeId, active,
                 CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                 CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified
                 FROM usersTrees WHERE userId='${userTreeData.userId}' AND treeId='${userTreeData.treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists user trees
     * @returns {Promise<void>}
     */
    model.getUserTreesList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT userId, treeId, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM usersTrees");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists active user trees by id
     * @param {String} userId - User unique identifier
     * @returns {Promise<void>}
     */
    model.getUserTreesListById = async (userId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT ut.userId, ut.treeId, ut.active,
                t.name as treeName, t.nameCommon as treeNameCommon, t.description as treeDescription, 
                t.observations as treeObservations, tp.name as typeName, tp.description as typeDescription,
                t.lat, t.lng,
                CONVERT_TZ(ut.dateCreated,'UTC','Europe/Lisbon') AS dateCreated, 
                CONVERT_TZ(ut.dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM usersTrees AS ut, trees as t, treeType as tp  
                WHERE ut.userId='${userId}' AND ut.active=1 
                AND ut.treeId=t.id AND t.typeId=tp.id`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new user tree
     * @param {Object} userTreeData - User tree details
     * @returns {Promise<void>}
     */
    model.createUserTree = async (userTreeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO usersTrees (userId, treeId, active) " +
                "VALUES (?, ?, ?)",
                [userTreeData.userId, userTreeData.treeId, userTreeData.active]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit user tree
     * @param {Object} userTreeData - User tree details
     * @returns {*}
     */
    model.editUserTree = async (userTreeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE usersTrees SET active=${userTreeData.active}, dateModified=NOW() 
                WHERE userId='${userTreeData.userId}' AND treeId='${userTreeData.treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete user tree
     * @param {Object} userTreeData - User tree details
     * @returns {*}
     */
    model.deleteUserTree = async (userTreeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM usersTrees WHERE userId='${userTreeData.userId}' AND treeId='${userTreeData.treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
