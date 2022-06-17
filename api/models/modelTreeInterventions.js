'use strict';

const { dbPool } = require('./../helpers/db');
const {buildPatchSqlQuery} = require("../helpers/db");

module.exports = app => {
    const model = {};

    /**
     * Get intervention by id
     * @param {Object} interventionData - Intervention details
     * @returns {Promise<*>}
     */
    model.getInterventionById = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT id, treeId, subject, description, observations, public, active,
                 CONVERT_TZ(interventionDate,'UTC','Europe/Lisbon') AS interventionDate,
                 CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                 CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified
                 FROM treeInterventions WHERE id='${interventionData.id}'`);
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
     * Lists tree interventions
     * @param {Object} interventionData - Intervention details
     * @returns {Promise<void>}
     */
    model.getInterventionListByTreeId = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`SELECT id, treeId, subject, description, observations,
                CONVERT_TZ(interventionDate,'UTC','Europe/Lisbon') AS interventionDate,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified
                FROM treeInterventions
                WHERE treeId='${interventionData.treeId}' AND active=1 AND public=1`);
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
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
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
     * Edit intervention using PUT
     * @param {Object} interventionData - Intervention details
     * @returns {*}
     */
    model.editPutIntervention = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE treeInterventions SET treeId='${interventionData.treeId}', interventionDate='${interventionData.date}', subject='${interventionData.subject}',  
                         description='${interventionData.description}' , observations='${interventionData.observations}', public=${interventionData.public}, active=${interventionData.active}, dateModified=NOW() 
                WHERE id='${interventionData.id}'`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit intervention using PATCH
     * @param {Object} interventionData - Intervention details
     * @returns {*}
     */
    model.editPatchIntervention = async (interventionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(buildPatchSqlQuery('treeInterventions',interventionData.id, interventionData.body));
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
