'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const modelTreeType = require('./../models/modelTreeType')();

module.exports = app => {
    const controller = {};

    /**
     * List all tree types
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {

            const result = await modelTreeType.getTreeTypeList();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * View a tree type by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewTreeType = async (req, res) => {
        try {
            const treeTypeData = {
                id: req.params.treeTypeId,
            }

            const result = await modelTreeType.getTreeTypeById(treeTypeData.id);

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new tree type
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTreeType = async (req, res) => {
        try {
            const treeTypeData = {
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active
            }

            await modelTreeType.createTreeType(treeTypeData);

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
     * Edit tree type
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.editTreeType = async (req, res) => {
        try {
            const treeTypeData = {
                id: req.params.treeTypeId,
                name: req.body.name.trim(),
                description: req.body.description.trim(),
                active: req.body.active
            }

            await modelTreeType.editTreeType(treeTypeData);

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
     * Delete tree type by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteTreeType = async (req, res) => {
        try {
            const treeTypeData = {
                id: req.params.treeTypeId,
            }

            await modelTreeType.deleteTreeType(treeTypeData);

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
