'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get tree type by id
     * @param {Integer} treeTypeId - Tree type Id
     * @returns {Promise<*>}
     */
    model.getTreeTypeById = async (treeTypeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT id, name, description, active,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM treeType WHERE id=${treeTypeId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists tree types
     * @returns {Promise<void>}
     */
    model.getTreeTypeList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, name, description, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM treeType");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new tree type
     * @param {Object} treeTypeData - Tree type details
     * @returns {Promise<void>}
     */
    model.createTreeType = async (treeTypeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO treeType (name, description, active) " +
                "VALUES (?, ?, ?)",
                [treeTypeData.name, treeTypeData.description, treeTypeData.active]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit user group
     * @param {Object} userGroupData - User group details
     * @returns {*}
     */
    model.editUserGroup = async (userGroupData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE userGroups SET name='${userGroupData.name}', description='${userGroupData.description}', 
                securityId=${userGroupData.securityId}, active=${userGroupData.active}, dateModified=NOW() 
                WHERE id=${userGroupData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete user group
     * @param {Object} userGroupData - User group details
     * @returns {*}
     */
    model.deleteUserGroup = async (userGroupData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM userGroups WHERE id=${userGroupData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
