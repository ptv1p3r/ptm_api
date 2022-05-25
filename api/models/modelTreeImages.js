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
                FROM treeImages WHERE treeId='${treeId}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Get tree image by id and position
     * @param {String} treeId - Tree id
     * @param {Integer} position - Position id
     * @returns {Promise<void>}
     */
    model.getTreeImageByIdAndPosition = async (treeId, position) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, treeId, name, path, description, size, position, active, 
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM treeImages WHERE treeId='${treeId}' AND position=${position}`);
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
     * Edit a tree image using PATCH
     * @param imageData - Image details
     * @returns {Promise<any>}
     */
    model.editPatchTreeImage = async (imageData) => {
        let conn;

        try {

            conn = await dbPool.getConnection();

            return await conn.query(buildPatchSqlQuery('treeImages',imageData.id, imageData.body));

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
