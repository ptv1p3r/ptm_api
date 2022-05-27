'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get transaction type by id
     * @param {Integer} transactionTypeId - Transaction type Id
     * @returns {Promise<*>}
     */
    model.getTransactionTypeById = async (transactionTypeId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, name, description, active,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM transactionType WHERE id=${transactionTypeId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists all transaction types
     * @returns {Promise<void>}
     */
    model.getTransactionTypesList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, name, description, active, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "FROM transactionType");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new transaction type
     * @param {Object} transactionTypeData - Transaction type details
     * @returns {Promise<void>}
     */
    model.createTransactionType = async (transactionTypeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("INSERT INTO transactionType (name, description, active) " +
                "VALUES (?, ?, ?)",
                [transactionTypeData.name, transactionTypeData.description, transactionTypeData.active]);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit transaction type
     * @param {Object} transactionTypeData - Transaction type details
     * @returns {*}
     */
    model.editTransactionType = async (transactionTypeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE transactionType SET name='${transactionTypeData.name}', description='${transactionTypeData.description}', 
                active=${transactionTypeData.active}, dateModified=NOW() 
                WHERE id=${transactionTypeData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete transaction type
     * @param {Object} transactionTypeData - Transaction type details
     * @returns {*}
     */
    model.deleteTransactionType = async (transactionTypeData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM transactionType WHERE id=${transactionTypeData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
