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

            return await conn.query("SELECT id, name, nameCommon, description, observations, typeId, lat, lng, active, " +
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

            return await conn.query(`SELECT id, name, nameCommon, description, observations, typeId, lat, lng, active, 
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
     * @param {Object} treeData - Tree details
     * @returns {Promise<void>}
     */
    model.createTree = async (treeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("INSERT INTO trees value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [treeData.id, treeData.name, treeData.nameCommon, treeData.description, treeData.observations,
                    treeData.typeId, treeData.lat, treeData.lng, treeData.active, treeData.dateCreated, treeData.dateModified]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit a tree using PUT
     * @param {Object} treeData - Tree details
     * @returns {Promise<void>}
     */
    model.editPutTree = async (treeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`UPDATE trees SET name='${treeData.name}', nameCommon='${treeData.nameCommon}', description='${treeData.description}',
                 observations='${treeData.observations}', typeId=${treeData.typeId}, lat=${treeData.lat}, lng=${treeData.lng}, 
                 active=${treeData.active}, dateModified=NOW() WHERE id='${treeData.id}'`);

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit a tree using PATCH
     * @param treeData
     * @returns {Promise<any>}
     */
    model.editPatchTree = async (treeData) => {
        let conn;

        try {

            conn = await dbPool.getConnection();

            return await conn.query(buildPatchSqlQuery('trees',treeData.id, treeData.body));

        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete tree
     * @param {String} treeId - Tree unique identifier
     * @returns {*}
     */
    model.deleteTree = async (treeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM trees WHERE id='${treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
