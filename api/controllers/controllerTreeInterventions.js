'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelTreeInterventions = require('./../models/modelTreeInterventions')();
const modelTrees = require('./../models/modelTrees')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all tree interventions
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelTreeInterventions.getInterventionList();

            res.status(responseCode.SUCCESS_CODE.OK).json({
                interventions: result,
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
     * View intervention by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewIntervention = async (req, res) => {
        try {
            const userTreeData = {
                userId: req.params.userId,
                treeId: req.params.treeId
            }

            const result = await modelTreeInterventions.getUserTreeById(userTreeData);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new intervention
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createIntervention = async (req, res) => {
        try {
            const interventionData = {
                id: req.body.userId.trim(),
                treeId: req.body.treeId.trim(),
                interventionDate: req.body.date.trim(),
                subject: req.body.subject.trim(),
                description: req.body.description.trim(),
                observations: req.body.observations.trim(),
                public: req.body.public,
                active: req.body.active
            }

            // validate tree
            // await validateTree(interventionData);

            await modelTreeInterventions.createIntervention(interventionData);

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
     * Edit intervention
     * @param req
     * @param res
     */
    controller.editIntervention= async (req, res) => {
        try {
            const userTreeData = {
                userId: req.params.userId.trim(),
                treeId: req.params.treeId.trim(),
                active: req.body.active
            }

            await modelTreeInterventions.editUserTree(userTreeData);

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
     * Delete intervention by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteIntervention = async (req, res) => {
        try {
            const interventionData = {
                id: req.params.interventionId,
            }

            await modelTreeInterventions.deleteIntervention(interventionData);

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
