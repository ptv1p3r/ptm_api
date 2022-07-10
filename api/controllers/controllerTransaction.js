'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const crypto = require("crypto");
const modelTransaction = require('./../models/modelTransaction')();
const modelUser = require('./../models/modelUsers')();
const modelTrees = require('./../models/modelTrees')();

const PAYMENT_CODE = {
    WAITING: "WAITING PAYMENT",
    NOT_VALID: "PAYMENT NOT VALID",
    PAYMENT_OK: "PAYMENT VALID",
}

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

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TRANSACTION_FOUND
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

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TRANSACTION_FOUND
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
     * Creates new transaction
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTransaction = async (req, res) => {
        try {
            let transactionData = {
                id: crypto.randomUUID(),
                transactionTypeId: req.body.typeId,
                transactionMethodId: req.body.methodId,
                userId: req.body.userId.trim(),
                treeId: req.body.treeId.trim(),
                value: parseFloat(req.body.value).toFixed(2)
            }

            const user = await modelUser.getUserById(transactionData.userId);
            if (user.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                created: false,
                error: responseCode.MESSAGE.ERROR.NO_USER_FOUND
            });

            const tree = await modelTrees.getTreeById(transactionData.treeId);
            if (tree.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                created: false,
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

            // add user info
            transactionData.userName = user[0].name;
            transactionData.userNif = user[0].nif;
            // add tree info
            transactionData.treeName = tree[0].name;
            // set transaction state
            transactionData.state = PAYMENT_CODE.PAYMENT_OK;
            // set transaction valid
            transactionData.valid = 1;
            // set reference
            transactionData.reference = "";
            // set reference id
            transactionData.referenceId = "";
            // set request id
            transactionData.requestId = "";
            // set terminal
            transactionData.terminal = "";
            // set service tariff
            transactionData.serviceTariff = 0.0;
            // set value net
            transactionData.valueNet = 0.0;
            // set message
            transactionData.message = "";
            // set code
            transactionData.code = "";

            await modelTransaction.createTransaction(transactionData);

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
