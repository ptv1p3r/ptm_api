'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const crypto = require("crypto");
const modelTransaction = require('./../models/modelTransaction')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all transaction
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelTransaction.getTransactionList();

            res.status(responseCode.SUCCESS_CODE.OK).json({
                methods: result,
                total: result.length
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * View a transaction by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewTransaction= async (req, res) => {
        try {
            const transactionData = {
                id: req.params.transactionId,
            }

            const result = await modelTransaction.getTransactionById(transactionData.id);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new transaction
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTransaction = async (req, res) => {
        try {
            const transactionData = {
                id: crypto.randomUUID(),
                transactionTypeId: req.body.typeId,
                transactionMethodId: req.body.methodId,
                userId: req.body.userId.trim(),
                treeId: req.body.treeId.trim(),
                value: req.body.value
            }

            await modelTransaction.createTransactionType(transactionData);

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Edit transaction
     * @param req
     * @param res
     */
    controller.editTransaction = async (req, res) => {
        try {
            const editTransaction = {
                id: req.params.transactionId,
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active === true ? 1:0
            }

            await modelTransaction.editTransaction(editTransaction);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                updated: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                updated: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Delete transaction by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteTransaction = async (req, res) => {
        try {
            const transactionData = {
                id: req.params.transactionId,
            }

            await modelTransaction.deleteTransaction(transactionData);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                deleted: true
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                deleted: false,
                code: error.code,
                message: error.text
            });
        }
    }

    return controller;
}
