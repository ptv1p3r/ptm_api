'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelUserTrees = require('./../models/modelUserTrees')();
const modelTrees = require('./../models/modelTrees')();
const modelUser = require('./../models/modelUsers')();

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

            res.status(responseCode.SUCCESS_CODE.OK).json({
                trees: result,
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
     * Lists user trees by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAllById = async (req, res) => {
        try {
            const userId = req.params.userId.trim();

            const result = await modelUserTrees.getUserTreesListById(userId);

            res.status(responseCode.SUCCESS_CODE.OK).json({
                trees: result,
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

            // validate user
            await validateUser(userTreeData);

            // validate tree
            await validateTree(userTreeData);

            await modelUserTrees.createUserTree(userTreeData);

            res.status(responseCode.SUCCESS_CODE.CREATED).json({
                created: true
            });
        } catch (error) {
            res.status(error.errorResponse).json({
                created: false,
                code: error.errorResponse,
                message: error.errorMessage
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

/**
 * Validate user settings
 * - 404 if no user found
 * - 403 if user not active
 *
 * @param {Object} userTreeData
 * @returns {Promise<unknown>}
 */
function validateUser(userTreeData) {
    return new Promise(async (resolve, reject) => {
        // validate user
        await modelUser.getUserById(userTreeData.userId)
            .then( user => {
                if (!user) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.NOT_FOUND,
                        errorMessage: 'User not found!'
                    });
                }

                if (user[0].active === 0) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.FORBIDDEN,
                        errorMessage: 'User not active!'
                    });
                }

                return resolve();
            })
    });
}

/**
 * Validate tree
 * - 404 if no tree found
 * - 400 if tree not active
 * - 403 if tree is already assigned
 *
 * @param {Object} userTreeData
 * @returns {Promise<unknown>}
 */
function validateTree(userTreeData) {
    return new Promise(async (resolve, reject) => {
        // validate tree
        await modelTrees.getTreeById(userTreeData.treeId)
            .then( tree => {
                if (!tree) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.NOT_FOUND,
                        errorMessage: 'Tree not found!'
                    });
                }

                if (tree[0].active === 0) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.BAD_REQUEST,
                        errorMessage: 'Tree not active!'
                    });
                }
            })

        // validate tree usage
        await modelUserTrees.getTreeUsageCount(userTreeData.treeId)
            .then( tree =>{
                if (tree[0].total > 0) {
                    return reject({
                        errorResponse: responseCode.ERROR_CODE.FORBIDDEN,
                        errorMessage: 'Tree already assigned!'
                    });
                }
            })

        return resolve();
    });
}
