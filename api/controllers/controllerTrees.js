'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const crypto = require("crypto");
const emailController = require("../helpers/email");
const modelTrees = require('./../models/modelTrees')();

module.exports = app => {
    const controller = {};

    /**
     * Lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelTrees.treesListAll();

            res.status(responseCode.SUCCESS_CODE.OK).json(result);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Get tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.viewTree = async (req, res) => {
        try {
            const userData = {
                id: req.params.treeId
            }

            const tree = await modelTrees.getTreeById(userData.id);

            res.status(responseCode.SUCCESS_CODE.OK).json(tree);
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                created: false,
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Creates new tree
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.createTree = async (req, res) => {
        try {
            const treeData = {
                id: crypto.randomUUID(),
                name: req.body.name.trim(),
                nameCommon: req.body.nameCommon.trim(),
                description: req.body.description.trim(),
                observations: req.body.observations.trim(),
                typeId: req.body.typeId,
                lat: req.body.lat,
                lng: req.body.lng,
                active: false,
                dateCreated: new Date(),
                dateModified: new Date(),
            }

            await modelTrees.createTree(treeData);

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
     * Edit a tree using PUT
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.editPutTree = async (req, res) => {
        try {
            const treeData = {
                id: req.params.treeId.trim(),
                name: req.body.name.trim(),
                nameCommon: req.body.nameCommon.trim(),
                description: req.body.description.trim(),
                observations: req.body.observations.trim(),
                typeId: req.body.typeId,
                lat: req.body.lat,
                lng: req.body.lng,
                active: req.body.active
            }

            await modelTrees.editPutTree(treeData)

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
     * Edit a tree using PATCH
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.editPatchTree = async (req, res) => {
        try {
            const treeData = {
                id: req.params.treeId.trim(),
                body: req.body
            }

            await modelTrees.editPatchTree(treeData)

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
     * Delete tree by id
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.deleteTree = async (req, res) => {
        try {
            const treeId = req.params.treeId.trim();

            await modelTrees.deleteTree(treeId)

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
