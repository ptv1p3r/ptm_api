'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get transaction method by id
     * @param {Integer} transactionMethodId - Transaction method Id
     * @returns {Promise<*>}
     */
    model.getTransactionMethodById = async (transactionMethodId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, name, description, active,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM transactionMethod WHERE id=${transactionMethodId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists all transaction methods
     * @returns {Promise<void>}
     */
    model.getTransactionMethodsList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, name, description, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM transactionMethod");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new transaction method
     * @param {Object} transactionMethodData - Transaction method details
     * @returns {Promise<void>}
     */
    model.createTransactionMethod = async (transactionMethodData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO transactionMethod (name, description, active) " +
                "VALUES (?, ?, ?)",
                [transactionMethodData.name, transactionMethodData.description, transactionMethodData.active]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit transaction method
     * @param {Object} transactionMethodData - Transaction method details
     * @returns {*}
     */
    model.editTransactionMethod = async (transactionMethodData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE transactionMethod SET name='${transactionMethodData.name}', description='${transactionMethodData.description}', 
                active=${transactionMethodData.active}, dateModified=NOW() 
                WHERE id=${transactionMethodData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete transaction method
     * @param {Object} transactionMethodData - Transaction method details
     * @returns {*}
     */
    model.deleteTransactionMethod = async (transactionMethodData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM transactionMethod WHERE id=${transactionMethodData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
