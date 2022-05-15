'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelUserTrees = require('./../models/modelUserTrees')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all user trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelUserTrees.getUserTreesList();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * View a user tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewUserTree = async (req, res) => {
        try {
            const userTreeData = {
                userId: req.params.userId,
                treeId: req.params.treeId
            }

            const result = await modelUserTrees.getUserTreeById(userTreeData);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new user tree
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createUserTree = async (req, res) => {
        try {
            const userTreeData = {
                userId: req.body.userId.trim(),
                treeId: req.body.treeId.trim(),
                active: req.body.active
            }

            await modelUserTrees.createUserTree(userTreeData);

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
     * Edit user tree
     * @param req
     * @param res
     */
    controller.editUserTree = async (req, res) => {
        try {
            const userTreeData = {
                userId: req.params.userId.trim(),
                treeId: req.params.treeId.trim(),
                active: req.body.active
            }

            await modelUserTrees.editUserTree(userTreeData);

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
     * Delete user tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteUserTrees = async (req, res) => {
        try {
            const userTreeData = {
                userId: req.params.userId,
                treeId: req.params.treeId
            }

            await modelUserTrees.deleteUserTree(userTreeData);

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
