'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelTransactionMethods = require('./../models/modelTransactionMethods')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all transaction methods
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelTransactionMethods.getTransactionMethodsList();

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
     * View a user group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                id: req.params.groupId,
            }

            const result = await modelTransactionMethods.getUserGroupById(userGroupData.id);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new transaction method
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTransactionMethod = async (req, res) => {
        try {
            const transactionMethodData = {
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active === true ? 1:0
            }

            await modelTransactionMethods.createTransactionMethod(transactionMethodData);

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
     * Edit user group
     * @param req
     * @param res
     */
    controller.editUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                id: req.params.groupId,
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                securityId: req.body.securityId,
                active: req.body.active
            }

            await modelTransactionMethods.editUserGroup(userGroupData);

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
     * Delete user group by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteUserGroup = async (req, res) => {
        try {
            const userGroupData = {
                id: req.params.groupId,
            }

            await modelTransactionMethods.deleteUserGroup(userGroupData);

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
