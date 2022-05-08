'use strict';

const responseCode = require('../helpers/httpCodesDefinitions')
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

    controller.createTree = (req, res) => res.status(200).json("Create Tree");

    controller.editTree = (req, res) => res.status(200).json("Edit Tree");

    controller.deleteTree = (req, res) => res.status(200).json("Delete Tree");

    return controller;
}
