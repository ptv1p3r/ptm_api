'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const crypto = require("crypto");
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
            const interventionData = {
                id: req.params.interventionId.trim(),
            }

            const result = await modelTreeInterventions.getInterventionById(interventionData);

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
                id: crypto.randomUUID(),
                treeId: req.body.treeId.trim(),
                interventionDate: req.body.date.trim(),
                subject: req.body.subject.trim(),
                description: req.body.description.trim(),
                observations: req.body.observations.trim(),
                public: req.body.public,
                active: req.body.active
            }

            // validate tree
            await validateTree(interventionData);

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
     * Edit intervention using PUT
     * @param req
     * @param res
     */
    controller.editPutIntervention= async (req, res) => {
        try {
            const interventionData = {
                id: req.params.interventionId.trim(),
                treeId: req.body.treeId.trim(),
                date: req.body.date.trim(),
                subject: req.body.subject.trim(),
                description: req.body.description.trim(),
                observations: req.body.observations.trim(),
                public: req.body.public,
                active: req.body.active
            }

            await modelTreeInterventions.editPutIntervention(interventionData);

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
     * Edit intervention using PATCH
     * @param req
     * @param res
     */
    controller.editPatchIntervention= async (req, res) => {
        try {
            const interventionData = {
                id: req.params.interventionId.trim(),
                body: req.body
            }

            await modelTreeInterventions.editPatchIntervention(interventionData);

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
                id: req.params.interventionId.trim(),
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
 * @param {Object} treeData
 * @returns {Promise<unknown>}
 */
function validateTree(treeData) {
    return new Promise(async (resolve, reject) => {
        // validate tree
        await modelTrees.getTreeById(treeData.treeId)
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

        return resolve();
    });
}
