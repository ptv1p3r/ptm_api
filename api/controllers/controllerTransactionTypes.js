'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelTransactionTypes = require('./../models/modelTransactionTypes')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all transaction types
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelTransactionTypes.getTransactionTypesList();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TRANSACTION_TYPE_FOUND
            });

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
     * View a transaction type by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewTransactionType= async (req, res) => {
        try {
            const transactionTypeData = {
                id: req.params.transactionTypeId,
            }

            const result = await modelTransactionTypes.getTransactionTypeById(transactionTypeData.id);

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TRANSACTION_TYPE_FOUND
            });

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new transaction type
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTransactionType = async (req, res) => {
        try {
            const transactionMethodData = {
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active === true ? 1:0
            }

            await modelTransactionTypes.createTransactionType(transactionMethodData);

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
     * Edit transaction type
     * @param req
     * @param res
     */
    controller.editTransactionType = async (req, res) => {
        try {
            const editTransactionType = {
                id: req.params.transactionTypeId,
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active === true ? 1:0
            }

            await modelTransactionTypes.editTransactionType(editTransactionType);

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
     * Delete transaction type by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteTransactionType = async (req, res) => {
        try {
            const transactionTypeData = {
                id: req.params.transactionTypeId,
            }

            await modelTransactionTypes.deleteTransactionType(transactionTypeData);

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
