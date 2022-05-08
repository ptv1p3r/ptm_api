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
                created: false,
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

            const tree = await modelTrees.getTreeById(userData.treeId);

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

    controller.editTree = (req, res) => res.status(200).json("Edit Tree");

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
