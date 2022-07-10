'use strict';

const { dbPool } = require('./../helpers/db');

module.exports = app => {
    const model = {};

    /**
     * Get transaction by id
     * @param {Integer} transactionId - Transaction Id
     * @returns {Promise<*>}
     */
    model.getTransactionById = async (transactionId) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            return await conn.query(`SELECT id, name, description, active,
                CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated,
                CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified 
                FROM transactionType WHERE id=${transactionId}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Lists all transactions
     * @returns {Promise<void>}
     */
    model.getTransactionList = async () => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query("SELECT id, transactionTypeId, transactionMethodId, userId, userName, userNif, treeId, " +
                "treeName, reference, referenceId, requestId, terminal, serviceTariff, value, valueNet, valid, state, message, code, " +
                "CONVERT_TZ(dateCreated,'UTC','Europe/Lisbon') AS dateCreated, " +
                "CONVERT_TZ(dateModified,'UTC','Europe/Lisbon') AS dateModified " +
                "CONVERT_TZ(dateValidated,'UTC','Europe/Lisbon') AS dateValidated " +
                "FROM transactions");
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Create a new transaction
     * @param {Object} transactionData - Transaction details
     * @returns {Promise<void>}
     */
    model.createTransaction = async (transactionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();

            /* Begin transaction */
            await conn.beginTransaction();

            // insert user tree relation as active
            await conn.query(`INSERT INTO usersTrees (userId, treeId, active) 
                VALUES ('${transactionData.userId}', '${transactionData.treeId}', 1)`, (err, result) => {
                if (err) {
                    conn.rollback();
                }
            });

            // insert transaction
            await conn.query(`INSERT INTO transactions (id, transactionTypeId, transactionMethodId, userId, userName, userNif, treeId, 
                          treeName, reference, referenceId, requestId, terminal, serviceTariff, value, valueNet, valid, state, message,
                          code) 
                VALUES ('${transactionData.id}', ${transactionData.transactionTypeId}, ${transactionData.transactionMethodId},
                        '${transactionData.userId}', '${transactionData.userName}', ${transactionData.userNif}, '${transactionData.treeId}',
                        '${transactionData.treeName}', '${transactionData.reference}', '${transactionData.referenceId}', '${transactionData.requestId}',
                        '${transactionData.terminal}', ${transactionData.serviceTariff}, ${transactionData.value}, ${transactionData.valueNet},
                        ${transactionData.valid}, '${transactionData.state}', '${transactionData.message}', '${transactionData.code}')`, (err, result) => {
                if (err) {
                    conn.rollback();
                }
            });

            await conn.commit();
            /* End transaction */


        } catch (err) {
            await conn.rollback();
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Edit transaction
     * @param {Object} transactionData - Transaction details
     * @returns {*}
     */
    model.editTransaction = async (transactionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`UPDATE transactionType SET name='${transactionData.name}', description='${transactionData.description}', 
                active=${transactionData.active}, dateModified=NOW() 
                WHERE id=${transactionData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    /**
     * Delete transaction
     * @param {Object} transactionData - Transaction details
     * @returns {*}
     */
    model.deleteTransaction = async (transactionData) => {
        let conn;

        try {
            conn = await dbPool.getConnection();
            return await conn.query(`DELETE FROM transactionType WHERE id=${transactionData.id}`);
        } catch (err) {
            console.log("error: " + err);
            throw err;
        } finally {
            if (conn) await conn.end();
        }
    }

    return model;
}
