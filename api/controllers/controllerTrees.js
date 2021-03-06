'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
const crypto = require("crypto");
const emailController = require("../helpers/email");
const modelTrees = require('./../models/modelTrees')();

module.exports = app => {
    const controller = {};

    /**
     * Public lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.publicList = async (req, res) => {
        try {
            const result = await modelTrees.treesPublicList();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

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
     * Public tree info
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.publicTreeInfo = async (req, res) => {
        try {
            const result = await modelTrees.treesCount();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

            // dados recolhidos com uma media por arvore ao longo dos primeiros 20 anos
            const countCo2 = parseFloat( ((Number(result[0].total) * 7.14) * 20).toFixed(2) );
            //500lt dia
            const countH2o = parseFloat( ( ((Number(result[0].total) * 500.00) * 365) * 20).toFixed(2) );
            // 117kg ano --> 0.320548 dia
            const countO2 = parseFloat( ( ((Number(result[0].total) * 0.320548) * 365) * 20).toFixed(2) );

            res.status(responseCode.SUCCESS_CODE.OK).json({
                treesTotal: Number(result[0].total),
                co2Kg: countCo2,
                H2oLt: countH2o,
                O2Kg: countO2,
            });
        } catch (error) {
            res.status(responseCode.ERROR_CODE.BAD_REQUEST).json({
                code: error.code,
                message: error.text
            });
        }
    }

    /**
     * Lists all trees available for transaction
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listTransactionAvailable = async (req, res) => {
        try {
            const result = await modelTrees.treesListTransactionAvailable();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

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
     * Lists all trees
     * @param req
     * @param res
     * @returns {Promise<void>}
     */
    controller.listAll = async (req, res) => {
        try {
            const result = await modelTrees.treesListAll();

            if (result.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

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

            if (tree.length === 0) return res.status(responseCode.ERROR_CODE.NOT_FOUND).json({
                error: responseCode.MESSAGE.ERROR.NO_TREE_FOUND
            });

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
                active: req.body.active,
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
