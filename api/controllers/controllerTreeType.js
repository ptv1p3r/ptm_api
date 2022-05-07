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

    controller.createTree = (req, res) => res.status(200).json("Create Tree");

    controller.editTree = (req, res) => res.status(200).json("Edit Tree");

    controller.deleteTree = (req, res) => res.status(200).json("Delete Tree");

    return controller;
}
