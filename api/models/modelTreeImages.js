'use strict';

const { dbPool, buildPatchSqlQuery } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Lists all trees
     * @returns {Promise<void>}
     */
    model.imagesListAll = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("SELECT id, treeId, name, path, description, size, position, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM treeImages");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get tree image by id
     * @param {String} treeId - Tree id
     * @returns {Promise<void>}
     */
    model.getTreeImageById = async (treeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, treeId, name, path, description, size, position, active, 
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM treeImages WHERE id='${treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new tree image
     * @param {Object} treeImageData - Tree Image details
     * @returns {Promise<void>}
     */
    model.createTreeImage = async (treeImageData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query("INSERT INTO treeImages value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                [treeImageData.id, treeImageData.treeId, treeImageData.name, treeImageData.path, treeImageData.description, treeImageData.size,
                    treeImageData.position, treeImageData.active, treeImageData.dateCreated, treeImageData.dateModified]);
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
     * Delete tree image
     * @param {String} imageId - Image unique identifier
     * @returns {*}
     */
    model.deleteTreeImage = async (imageId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM treeImages WHERE id='${imageId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
