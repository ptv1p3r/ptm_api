'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

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
     * Lists tree interventions
     * @returns {Promise<void>}
     */
    model.getInterventionList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, treeId, subject, description, observations, " +
                "public, active, " +
                "CONVERT_TZ(interventionDate,'UTC','Europe/Lisbon') AS interventionDate, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM treeInterventions");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new intervention
     * @param {Object} interventionData - Intervention details
     * @returns {Promise<void>}
     */
    model.createIntervention = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO treeInterventions (id, treeId, interventionDate, subject, description, observations, public, active) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)",
                [interventionData.id, interventionData.treeId, interventionData.interventionDate, interventionData.subject, interventionData.description,
                    interventionData.observations, interventionData.public, interventionData.active]);
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
     * Delete intervention
     * @param {Object} interventionData - Intervention details
     * @returns {*}
     */
    model.deleteIntervention = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM treeInterventions WHERE id='${interventionData.id}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
